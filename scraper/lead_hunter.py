import requests
import csv
import time
import sys
import os
import re
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

"""
KBD Credit Solutions - Full Spectrum Hunting Engine
--------------------------------------------------
This script automatically pulls business names and phone numbers
for targeted local searches. It splits operations into two modes:
1. Connectors (Finding B2B Partners to refer leads)
2. Customers (Finding B2B Businesses to directly pitch loans)

V2.6 Update: Added Multi-threaded Email Intel & Validation.
"""

API_KEY = "AIzaSyD7VkFIkLvqs3ZTbXY9Q_rkNAG11sDYufw"

# Regex for finding emails
EMAIL_REGEX = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# Common "junk" email patterns to exclude
JUNK_PATTERNS = [
    ".png", ".jpg", ".jpeg", ".gif", ".pdf", ".svg", ".css", ".js", 
    "sentry.io", "wixpress.com", "example.com", "email@email.com"
]

def is_valid_email(email):
    """Deep validation for found emails."""
    email = email.lower().strip()
    
    # Check basic regex
    if not re.match(r'^' + EMAIL_REGEX + r'$', email):
        return False
        
    # Check for junk extensions or known trash domains
    for junk in JUNK_PATTERNS:
        if junk in email:
            return False
            
    # Professional length check
    if len(email) < 5 or len(email) > 80:
        return False
        
    return True

def extract_emails_from_url(url):
    """Visits a URL and harvests unique, valid emails."""
    if not url or not url.startswith("http"):
        return []
        
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return []
            
        # Parse text and mailto links
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. Look for mailto: links
        mailto_emails = []
        for a in soup.find_all('a', href=True):
            if a['href'].startswith('mailto:'):
                email = a['href'].replace('mailto:', '').split('?')[0]
                mailto_emails.append(email)
                
        # 2. Look for emails in raw text via regex
        found_emails = re.findall(EMAIL_REGEX, response.text)
        
        # Combine, uniqueify and validate
        all_found = list(set(mailto_emails + found_emails))
        valid_emails = [e for e in all_found if is_valid_email(e)]
        
        return list(set(valid_emails))
        
    except Exception as e:
        return []

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def fetch_leads(query, target_type, max_results=60):
    if API_KEY == "YOUR_GOOGLE_API_KEY_HERE":
        print("\n[ERROR] Missing Google API Key!")
        sys.exit(1)

    print(f"\n🚀 Hunting {target_type} matching: '{query}'")
    print("--------------------------------------------------")
    
    leads = []
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={API_KEY}"
    
    try:
        while url and len(leads) < max_results:
            response = requests.get(url).json()
            
            if response.get("status") != "OK":
                if response.get("status") == "ZERO_RESULTS":
                    print("[!] No results found for this query.")
                else:
                    print(f"[!] API Error: {response.get('status')}")
                break
                
            places = response.get("results", [])
            for place in places:
                place_id = place.get("place_id")
                
                # Fetch detailed info to get phone numbers
                detail_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_phone_number,formatted_address,website&key={API_KEY}"
                detail_res = requests.get(detail_url).json()
                
                if detail_res.get("status") == "OK":
                    details = detail_res.get("result", {})
                    phone = details.get("formatted_phone_number", "")
                    
                    if phone: # Only keep leads with actual phone numbers
                        lead = {
                            "Business Name": details.get("name", "Unknown"),
                            "Phone Number": phone,
                            "Address": details.get("formatted_address", ""),
                            "Website": details.get("website", ""),
                            "Emails": "", # Placeholder for next phase
                            "Search Phrase Used": query,
                            "Profile Category": target_type
                        }
                        leads.append(lead)
                        print(f"✅ Found Base Info: {lead['Business Name']}")
                
                if len(leads) >= max_results:
                    break
                    
            next_page_token = response.get("next_page_token")
            if next_page_token and len(leads) < max_results:
                time.sleep(2) # Google required delay
                url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
            else:
                url = None
                
    except Exception as e:
        print(f"\n[!] Failed to scrape: {e}")

    # --- PHASE 2: Intelligence Gathering (Emails) ---
    if leads:
        print(f"\n🕵️ Phase 2: Prospecting for verified emails for {len(leads)} leads...")
        
        # Define the work for each thread
        def enrich_lead(lead):
            if lead["Website"]:
                emails = extract_emails_from_url(lead["Website"])
                if emails:
                    lead["Emails"] = ", ".join(emails)
                    return True
            return False

        # Execute in parallel to save time
        with ThreadPoolExecutor(max_workers=10) as executor:
            enriched_count = sum(list(executor.map(enrich_lead, leads)))
        
        print(f"🎯 Email Discovery Complete. Found emails for {enriched_count} prospects.")

        # --- PHASE 3: Dedicated Email Export ---
        if enriched_count > 0:
            save_emails_only(leads)

    return leads

def save_emails_only(leads):
    """Exports a clean list of just Business Name + Email for marketing tools."""
    filename = "extracted_emails_list.csv"
    file_exists = os.path.isfile(filename)
    
    rows = []
    for lead in leads:
        if lead["Emails"]:
            # If multiple emails, split into separate rows for better CRM import
            email_list = lead["Emails"].split(", ")
            for email in email_list:
                rows.append({
                    "Business Name": lead["Business Name"],
                    "Email": email,
                    "Source": lead["Profile Category"]
                })

    if not rows:
        return

    with open(filename, 'a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["Business Name", "Email", "Source"])
        if not file_exists:
            writer.writeheader()
        writer.writerows(rows)
    
    print(f"📧 Clean email-only list updated in '{filename}' ({len(rows)} new entries).")

def save_to_csv(leads, filename):
    if not leads:
        print(f"\n[!] No leads found to save. Try a broader search term.")
        return

    # Standard headers for KBD V2.6
    fieldnames = [
        "Business Name", "Phone Number", "Address", "Website", 
        "Emails", "Search Phrase Used", "Profile Category"
    ]
    
    # Check if file exists to determine if we write header
    file_exists = os.path.isfile(filename)
    
    # If file exists, check if header matches. If not, we might need a fresh start or to handle it.
    if file_exists:
        with open(filename, 'r', encoding='utf-8') as f:
            first_line = f.readline()
            if "Emails" not in first_line:
                print(f"[!] Legacy CSV detected. Renaming old file to '{filename}.old' and creating new schema.")
                os.rename(filename, f"{filename}.old")
                file_exists = False

    with open(filename, 'a', newline='', encoding='utf-8') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=fieldnames, extrasaction='ignore')
        if not file_exists:
            dict_writer.writeheader()
        dict_writer.writerows(leads)
        
    print(f"\n🎉 Success! Added {len(leads)} fresh {leads[0]['Profile Category']} leads into '{filename}'.")

def main():
    clear_screen()
    print("==================================================")
    print("       KBD CREDIT SOLUTIONS - MASTER HUNTER       ")
    print("==================================================")
    print("Select Hunting Mode:")
    print("[1] Hunt for CONNECTORS (Chartered Accts, Brokers, Tax Consultants)")
    print("[2] Hunt for CUSTOMERS  (Restaurants, Manufacturers, Direct B2B)")
    print("[0] Exit")
    print("==================================================")
    
    choice = input("\nEnter Choice (1 or 2): ").strip()
    
    if choice == '1':
        target_type = "Connector"
        filename = "potential_connectors.csv"
        print("\n--- CONNECTOR HUNTING ---")
        print("💡 Ideas: 'Chartered Accountants in Indiranagar', 'Real Estate Brokers Bangalore', 'Tax Consultants in Whitefield'")
        query = input("Enter exactly what you want to search for: ")
        limit = input("Max leads to pull (default 60): ")
        limit = int(limit) if limit.isdigit() else 60
        
        leads = fetch_leads(query, target_type, limit)
        save_to_csv(leads, filename)

    elif choice == '2':
        target_type = "Customer"
        filename = "potential_customers.csv"
        print("\n--- CUSTOMER HUNTING ---")
        print("💡 Ideas: 'Garment Manufacturers in Peenya', 'Boutique Hotels inside Koramangala', 'Hardware stores'")
        query = input("Enter exactly what you want to search for: ")
        limit = input("Max leads to pull (default 60): ")
        limit = int(limit) if limit.isdigit() else 60
        
        leads = fetch_leads(query, target_type, limit)
        save_to_csv(leads, filename)
        
    elif choice == '0':
        print("\nExiting. Happy hunting!")
        sys.exit(0)
    else:
        print("\n[!] Invalid choice. Please run script again.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled. Exiting.")
        sys.exit(0)

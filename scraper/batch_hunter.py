import requests
import csv
import time
import re
import os
import sys
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

"""
KBD Credit Solutions - Batch Lead Hunter v3.0
----------------------------------------------
Fully automated lead generation engine.
Cycles through multiple search queries across cities
to generate 1000+ leads per category (Connectors & Customers).

Usage:
  python batch_hunter.py --mode connectors
  python batch_hunter.py --mode customers
  python batch_hunter.py --mode both
"""

API_KEY = "AIzaSyD7VkFIkLvqs3ZTbXY9Q_rkNAG11sDYufw"

EMAIL_REGEX = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
JUNK_PATTERNS = [
    ".png", ".jpg", ".jpeg", ".gif", ".pdf", ".svg", ".css", ".js",
    "sentry.io", "wixpress.com", "example.com", "email@email.com",
    "noreply", "no-reply", "unsubscribe"
]

# --- SEARCH QUERIES ---

CITIES = [
    "Bangalore", "Indiranagar Bangalore", "Koramangala Bangalore",
    "Whitefield Bangalore", "HSR Layout Bangalore", "Jayanagar Bangalore",
    "JP Nagar Bangalore", "Electronic City Bangalore", "Rajajinagar Bangalore",
    "Marathahalli Bangalore", "Hebbal Bangalore", "Yelahanka Bangalore",
    "Banashankari Bangalore", "BTM Layout Bangalore", "Malleshwaram Bangalore",
    "Basavanagudi Bangalore", "MG Road Bangalore", "Brigade Road Bangalore",
    "Peenya Bangalore", "Bommanahalli Bangalore",
]

CONNECTOR_CATEGORIES = [
    "Chartered Accountants in {city}",
    "CA firms in {city}",
    "Tax Consultants in {city}",
    "Financial Advisors in {city}",
    "Insurance Agents in {city}",
    "Real Estate Agents in {city}",
    "Real Estate Brokers in {city}",
    "Property Dealers in {city}",
    "Real Estate Builders in {city}",
    "Construction Companies in {city}",
    "Mortgage Brokers in {city}",
    "Loan Agents in {city}",
    "Investment Advisors in {city}",
    "Mutual Fund Distributors in {city}",
    "Stock Brokers in {city}",
    "Company Secretaries in {city}",
    "Auditing Firms in {city}",
    "GST Consultants in {city}",
    "Wealth Management in {city}",
    "Banking Consultants in {city}",
]

CUSTOMER_CATEGORIES = [
    "Restaurants in {city}",
    "Hotels in {city}",
    "Boutique Hotels in {city}",
    "Garment Manufacturers in {city}",
    "Textile Shops in {city}",
    "Hardware Stores in {city}",
    "Electronics Shops in {city}",
    "Furniture Stores in {city}",
    "Auto Dealers in {city}",
    "Car Showrooms in {city}",
    "Gym and Fitness Centers in {city}",
    "Salons and Spas in {city}",
    "Medical Clinics in {city}",
    "Dental Clinics in {city}",
    "Pharmacies in {city}",
    "Supermarkets in {city}",
    "Grocery Stores in {city}",
    "Printing Press in {city}",
    "Event Management Companies in {city}",
    "Travel Agencies in {city}",
    "Coaching Centers in {city}",
    "Pre-schools and Play Schools in {city}",
    "Interior Designers in {city}",
    "Architects in {city}",
    "Retail Shops in {city}",
    "Manufacturing Companies in {city}",
    "MSME in {city}",
    "Small Businesses in {city}",
    "Bakeries in {city}",
    "Cafes in {city}",
]

# --- UTILITIES ---

def is_valid_email(email):
    email = email.lower().strip()
    if not re.match(r'^' + EMAIL_REGEX + r'$', email):
        return False
    for junk in JUNK_PATTERNS:
        if junk in email:
            return False
    if len(email) < 5 or len(email) > 80:
        return False
    return True

def extract_emails_from_url(url):
    if not url or not url.startswith("http"):
        return []
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, headers=headers, timeout=8)
        if response.status_code != 200:
            return []
        soup = BeautifulSoup(response.text, 'html.parser')
        mailto_emails = []
        for a in soup.find_all('a', href=True):
            if a['href'].startswith('mailto:'):
                email = a['href'].replace('mailto:', '').split('?')[0]
                mailto_emails.append(email)
        found_emails = re.findall(EMAIL_REGEX, response.text)
        all_found = list(set(mailto_emails + found_emails))
        return [e for e in all_found if is_valid_email(e)]
    except Exception:
        return []

# --- CORE ENGINE ---

def fetch_leads_for_query(query, target_type, max_per_query=60):
    """Fetch leads for a single search query. Returns list of lead dicts."""
    leads = []
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={API_KEY}"

    try:
        while url and len(leads) < max_per_query:
            response = requests.get(url, timeout=15).json()

            if response.get("status") != "OK":
                break

            places = response.get("results", [])
            for place in places:
                place_id = place.get("place_id")
                detail_url = (
                    f"https://maps.googleapis.com/maps/api/place/details/json"
                    f"?place_id={place_id}"
                    f"&fields=name,formatted_phone_number,formatted_address,website"
                    f"&key={API_KEY}"
                )
                detail_res = requests.get(detail_url, timeout=10).json()

                if detail_res.get("status") == "OK":
                    details = detail_res.get("result", {})
                    phone = details.get("formatted_phone_number", "")

                    if phone:
                        lead = {
                            "Business Name": details.get("name", "Unknown"),
                            "Phone Number": phone,
                            "Address": details.get("formatted_address", ""),
                            "Website": details.get("website", ""),
                            "Emails": "",
                            "Search Phrase Used": query,
                            "Profile Category": target_type,
                        }
                        leads.append(lead)

                if len(leads) >= max_per_query:
                    break

            next_page_token = response.get("next_page_token")
            if next_page_token and len(leads) < max_per_query:
                time.sleep(2)
                url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
            else:
                url = None

    except Exception as e:
        print(f"  [!] Error on query '{query}': {e}")

    return leads

def enrich_with_emails(leads):
    """Phase 2: Multi-threaded email harvesting from websites."""
    if not leads:
        return 0

    def enrich_lead(lead):
        if lead["Website"]:
            emails = extract_emails_from_url(lead["Website"])
            if emails:
                lead["Emails"] = ", ".join(emails)
                return True
        return False

    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(enrich_lead, leads))

    return sum(results)

def deduplicate(leads):
    """Remove duplicates based on phone number."""
    seen_phones = set()
    unique = []
    for lead in leads:
        phone = lead["Phone Number"].replace(" ", "").replace("-", "")
        if phone not in seen_phones:
            seen_phones.add(phone)
            unique.append(lead)
    return unique

def save_leads(leads, filename):
    """Save leads to CSV (overwrite mode for clean data)."""
    if not leads:
        print(f"  [!] No leads to save for {filename}")
        return

    fieldnames = [
        "Business Name", "Phone Number", "Address", "Website",
        "Emails", "Search Phrase Used", "Profile Category"
    ]

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(leads)

    print(f"\n  💾 Saved {len(leads)} unique leads to '{filename}'")

def save_emails_only(leads, filename="extracted_emails_list.csv"):
    """Export clean email-only list for CRM import."""
    rows = []
    for lead in leads:
        if lead.get("Emails"):
            for email in lead["Emails"].split(", "):
                rows.append({
                    "Business Name": lead["Business Name"],
                    "Email": email.strip(),
                    "Source": lead["Profile Category"]
                })
    if not rows:
        return

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["Business Name", "Email", "Source"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"  📧 Exported {len(rows)} clean emails to '{filename}'")

# --- MAIN BATCH ORCHESTRATOR ---

def run_batch(mode, target_count=1000):
    """Run the batch lead generation engine."""

    if mode in ("connectors", "both"):
        print("\n" + "=" * 60)
        print("  🎯 CONNECTOR HUNTING MODE")
        print("  Target: Financial Services, CAs, Builders, Brokers")
        print("=" * 60)

        all_connector_leads = []
        query_index = 0
        city_index = 0

        while len(all_connector_leads) < target_count:
            if query_index >= len(CONNECTOR_CATEGORIES):
                query_index = 0
                city_index += 1
                if city_index >= len(CITIES):
                    print(f"\n  [!] Exhausted all city+category combos. Got {len(all_connector_leads)} leads.")
                    break

            query = CONNECTOR_CATEGORIES[query_index].format(city=CITIES[city_index])
            print(f"\n  🔍 [{len(all_connector_leads)}/{target_count}] Searching: '{query}'")

            batch = fetch_leads_for_query(query, "Connector", max_per_query=60)
            if batch:
                all_connector_leads.extend(batch)
                all_connector_leads = deduplicate(all_connector_leads)
                print(f"  ✅ Found {len(batch)} | Total unique: {len(all_connector_leads)}")

            query_index += 1
            time.sleep(0.5)

        # Phase 2: Enrich with emails
        print(f"\n  🕵️ Enriching {len(all_connector_leads)} connector leads with emails...")
        email_count = enrich_with_emails(all_connector_leads)
        print(f"  🎯 Found emails for {email_count} connectors.")

        save_leads(all_connector_leads, "potential_connectors.csv")
        save_emails_only(all_connector_leads, "connector_emails.csv")

    if mode in ("customers", "both"):
        print("\n" + "=" * 60)
        print("  🎯 CUSTOMER HUNTING MODE")
        print("  Target: SMEs, Retail, Hotels, Manufacturers")
        print("=" * 60)

        all_customer_leads = []
        query_index = 0
        city_index = 0

        while len(all_customer_leads) < target_count:
            if query_index >= len(CUSTOMER_CATEGORIES):
                query_index = 0
                city_index += 1
                if city_index >= len(CITIES):
                    print(f"\n  [!] Exhausted all city+category combos. Got {len(all_customer_leads)} leads.")
                    break

            query = CUSTOMER_CATEGORIES[query_index].format(city=CITIES[city_index])
            print(f"\n  🔍 [{len(all_customer_leads)}/{target_count}] Searching: '{query}'")

            batch = fetch_leads_for_query(query, "Customer", max_per_query=60)
            if batch:
                all_customer_leads.extend(batch)
                all_customer_leads = deduplicate(all_customer_leads)
                print(f"  ✅ Found {len(batch)} | Total unique: {len(all_customer_leads)}")

            query_index += 1
            time.sleep(0.5)

        # Phase 2: Enrich with emails
        print(f"\n  🕵️ Enriching {len(all_customer_leads)} customer leads with emails...")
        email_count = enrich_with_emails(all_customer_leads)
        print(f"  🎯 Found emails for {email_count} customers.")

        save_leads(all_customer_leads, "potential_customers.csv")
        save_emails_only(all_customer_leads, "customer_emails.csv")

    print("\n" + "=" * 60)
    print("  🏁 BATCH HUNTING COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='KBD Batch Lead Hunter v3.0')
    parser.add_argument('--mode', type=str, choices=['connectors', 'customers', 'both'],
                        default='both', help='Which leads to hunt (default: both)')
    parser.add_argument('--target', type=int, default=1000,
                        help='Target lead count per category (default: 1000)')
    args = parser.parse_args()

    print("\n" + "=" * 60)
    print("  KBD CREDIT SOLUTIONS - BATCH HUNTER v3.0")
    print(f"  Mode: {args.mode.upper()} | Target: {args.target} leads each")
    print("=" * 60)

    run_batch(args.mode, args.target)

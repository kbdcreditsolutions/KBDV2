import requests
import csv
import time
import argparse
import sys

"""
KBD Credit Solutions - B2B Outbound Lead Scraper
--------------------------------------------------
This script automatically pulls business names and phone numbers
for a given search query (e.g., "Restaurants in Bangalore")
and generates a pristine CSV file for your cold-calling outreach team.

PREREQUISITI:
1. pip install requests
2. You need a free Google Maps API Key: https://developers.google.com/maps/documentation/places/web-service/get-api-key
"""

# IMPORTANT: Paste your Google API Key here OR pass it via command line
API_KEY = "AIzaSyD7VkFIkLvqs3ZTbXY9Q_rkNAG11sDYufw"

def fetch_leads(query, max_results=60):
    if API_KEY == "AIzaSyD7VkFIkLvqs3ZTbXY9Q_rkNAG11sDYufw:
        print("[ERROR] Please insert your Google API Key into the script!")
        sys.exit(1)

    print(f"\n🚀 Starting Hunt for: '{query}'")
    leads = []
    
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={API_KEY}"
    
    try:
        while url and len(leads) < max_results:
            response = requests.get(url).json()
            
            if response.get("status") != "OK":
                print(f"[!] API Error or No more results: {response.get('status')}")
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
                    
                    if phone: # Only keep leads with phone numbers
                        lead = {
                            "Business Name": details.get("name", "Unknown"),
                            "Phone Number": phone,
                            "Address": details.get("formatted_address", ""),
                            "Website": details.get("website", "N/A"),
                            "Source Query": query
                        }
                        leads.append(lead)
                        print(f"✅ Found: {lead['Business Name']} -> {lead['Phone Number']}")
                
                if len(leads) >= max_results:
                    break
                    
            next_page_token = response.get("next_page_token")
            if next_page_token and len(leads) < max_results:
                # Google requires a short delay before using the next page token
                time.sleep(2)
                url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
            else:
                url = None
                
    except Exception as e:
        print(f"[!] Failed to scrape: {e}")

    return leads

def save_to_csv(leads, filename="outbound_leads.csv"):
    if not leads:
        print("\n[!] No leads found to save.")
        return

    keys = leads[0].keys()
    with open(filename, 'w', newline='', encoding='utf-8') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(leads)
        
    print(f"\n🎉 Success! Saved {len(leads)} fresh B2B leads to '{filename}'. Happy hunting!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Scrape local businesses for Loan Outreach.')
    parser.add_argument('--query', type=str, help='What to search for? (e.g., "pharmacies in hyderabad")', required=True)
    parser.add_argument('--limit', type=int, default=60, help='Max leads to pull (default 60)')
    
    args = parser.parse_args()
    
    found_leads = fetch_leads(args.query, args.limit)
    save_to_csv(found_leads)

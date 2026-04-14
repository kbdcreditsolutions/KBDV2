import os
import requests
import json

# Manual .env loader
def load_env():
    if os.path.exists('.env'):
        with open('.env') as f:
            for line in f:
                if '=' in line:
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value

load_env()

SUB_URL = os.getenv('SUPABASE_URL')
SVC_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

print(f"--- KBD Connect Connection Debugger ---")
print(f"Target URL: {SUB_URL}")

def check_table():
    url = f"{SUB_URL}/rest/v1/lead_submissions?select=*"
    headers = {
        "apikey": SVC_KEY,
        "Authorization": f"Bearer {SVC_KEY}"
    }
    
    print("\n[1/2] Checking if 'lead_submissions' table exists and is readable...")
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        print("✅ SUCCESS: Table found and readable.")
        data = response.json()
        print(f"   Current Record Count: {len(data)}")
    else:
        print(f"❌ FAILED: Status {response.status_code}")
        print(f"   Message: {response.text}")
        return False
    return True

def test_insert():
    url = f"{SUB_URL}/rest/v1/lead_submissions"
    headers = {
        "apikey": SVC_KEY,
        "Authorization": f"Bearer {SVC_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    test_data = {
        "customer_name": "ROBOT_TEST_CONNECTION",
        "phone": "0000000000",
        "email": "test@kbd.com",
        "city": "CyberSpace",
        "employment_type": "Digital Assistant",
        "loan_type": "Test",
        "amount": 9999,
        "status": "Test"
    }
    
    print("\n[2/2] Attempting a secure test injection (Service Role)...")
    response = requests.post(url, headers=headers, data=json.dumps(test_data))
    
    if response.status_code == 201:
        print("✅ SUCCESS: Data injected successfully.")
        print("   Connection is 100% active.")
    else:
        print(f"❌ FAILED: Status {response.status_code}")
        print(f"   Message: {response.text}")

if __name__ == "__main__":
    if check_table():
        test_insert()
    else:
        print("\n--- ACTION REQUIRED ---")
        print("Please copy the code from SCHEMA.sql and run it in your Supabase SQL Editor.")

import os
import requests
import json

# Manual .env loader
def load_env():
    if os.path.exists('.env'):
        with open('.env') as f:
            for line in f:
                if '=' in line:
                    parts = line.strip().split('=', 1)
                    if len(parts) == 2:
                        os.environ[parts[0]] = parts[1]

load_env()

SUB_URL = os.getenv('SUPABASE_URL')
SVC_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
ADMIN_EMAIL = "kbdcreditsolutions@gmail.com"

print(f"--- KBD Admin Automator (V3.1 Secure Bypass) ---")

def repair_and_graduate():
    headers = {
        "apikey": SVC_KEY,
        "Authorization": f"Bearer {SVC_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    # 1. Check if the table exists
    print("\n[1/3] Checking if 'public.profiles' already exists...")
    check_url = f"{SUB_URL}/rest/v1/profiles?select=*"
    res = requests.get(check_url, headers=headers)
    
    if res.status_code != 200:
        print(f"❌ FAILED: Error {res.status_code}")
        print(f"   Message: {res.text}")
        print("\n--- ACTION REQUIRED ---")
        print("Wait! This means the SQL script failed. Please try running SCHEMA.sql V3.1 ONE LAST TIME first.")
        return

    profiles = res.json()
    print(f"✅ SUCCESS: 'profiles' table found. (Records: {len(profiles)})")

    # 2. Identify the User UUID (Targeting the only record if just one exists)
    print("\n[2/3] Identifying the target account...")
    
    if len(profiles) == 1:
        target_id = profiles[0]['id']
        print(f"✅ SUCCESS: Automatically targeting the only existing profile: {target_id}")
    else:
        # Fallback to login search
        print("Multiple profiles found. Identifying via login...")
        login_url = f"{SUB_URL}/auth/v1/token?grant_type=password"
        login_data = {"email": ADMIN_EMAIL, "password": "Hapiness@411"}
        lres = requests.post(login_url, headers={"apikey": SVC_KEY}, data=json.dumps(login_data))
        
        if lres.status_code == 200:
            target_id = lres.json()['user']['id']
            print(f"✅ SUCCESS: Found User ID {target_id}")
        else:
            print(f"❌ FAILED: Could not identify ID. {lres.text}")
            return

    # 3. Graduate to Admin
    print(f"\n[3/3] Promoting {ADMIN_EMAIL} to SUPER USER...")
    update_url = f"{SUB_URL}/rest/v1/profiles?id=eq.{target_id}"
    update_payload = {"role": "admin", "full_name": "CEO Admin"}
    
    # Use UPSERT to handle missing profiles
    ures = requests.patch(update_url, headers=headers, data=json.dumps(update_payload))
    
    if ures.status_code in [200, 201, 204]:
        print("✅ SUCCESS: You are now an Admin!")
        print("Please refresh your dashboard to see the Global Pipeline.")
    else:
        # Try a direct insert if patch didn't find the record
        print("⚠️ Patch found no record. Attempting direct profile insertion...")
        insert_payload = {"id": target_id, "role": "admin", "full_name": "CEO Admin"}
        ires = requests.post(f"{SUB_URL}/rest/v1/profiles", headers=headers, data=json.dumps(insert_payload))
        if ires.status_code in [201, 204]:
             print("✅ SUCCESS: Admin profile created and graduated.")
        else:
             print(f"❌ FAILED: Final attempt failed. {ires.text}")

if __name__ == "__main__":
    repair_and_graduate()

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
USER_ID = "8dcc771f-a7e2-444b-a77c-965f8f3e06b5" # Identified in previous run
NEW_PASSWORD = "KBDAdmin2024!"

print(f"--- KBD Force Admin Access Recovery ---")

def force_access():
    headers = {
        "apikey": SVC_KEY,
        "Authorization": f"Bearer {SVC_KEY}",
        "Content-Type": "application/json"
    }
    
    # 1. Update Auth User (Confirm Email + Set Password)
    print(f"\n[1/2] Forcing Auth Confirmation & Password Reset for {USER_ID}...")
    auth_url = f"{SUB_URL}/auth/v1/admin/users/{USER_ID}"
    auth_payload = {
        "password": NEW_PASSWORD,
        "email_confirm": True
    }
    
    res = requests.put(auth_url, headers=headers, data=json.dumps(auth_payload))
    
    if res.status_code == 200:
        print("✅ SUCCESS: Auth account confirmed and password reset.")
    else:
        print(f"❌ FAILED Auth Update: {res.status_code}")
        print(f"   {res.text}")
        return

    # 2. Ensure Profile is Admin
    print(f"\n[2/2] Ensuring Profile Role is 'admin'...")
    profile_url = f"{SUB_URL}/rest/v1/profiles?id=eq.{USER_ID}"
    profile_payload = {"role": "admin", "full_name": "KBD CEO Admin"}
    
    pres = requests.patch(profile_url, headers=headers, data=json.dumps(profile_payload))
    
    if pres.status_code in [200, 204]:
        print("✅ SUCCESS: Role set to 'admin'.")
        print(f"\n--- FINAL LOGIN CREDENTIALS ---")
        print(f"URL: http://localhost:8000/login.html")
        print(f"Email: kbdcreditsolutions@gmail.com")
        print(f"Password: {NEW_PASSWORD}")
    else:
        print(f"❌ FAILED Profile Update: {pres.text}")

if __name__ == "__main__":
    force_access()

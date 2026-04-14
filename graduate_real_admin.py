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

print(f"--- KBD Real Admin Finder & Graduate ---")

def graduate_real_admin():
    headers = {
        "apikey": SVC_KEY,
        "Authorization": f"Bearer {SVC_KEY}",
        "Content-Type": "application/json"
    }
    
    # 1. List ALL Auth Users to find the real ID
    print("\n[1/2] Fetching master user list from Auth...")
    auth_url = f"{SUB_URL}/auth/v1/admin/users"
    res = requests.get(auth_url, headers=headers)
    
    if res.status_code != 200:
        print(f"❌ FAILED to list users: {res.text}")
        return

    users = res.json().get('users', [])
    real_id = None
    
    for user in users:
        if user.get('email') == ADMIN_EMAIL:
            real_id = user['id']
            print(f"✅ FOUND REAL ADMIN ID: {real_id}")
            break
            
    if not real_id:
        print(f"❌ FAILED: No user found with email {ADMIN_EMAIL}")
        return

    # 2. Force Graduate this ID
    print(f"\n[2/2] Graduating {ADMIN_EMAIL} to SUPER USER...")
    
    # Ensure profile exists first (using UPSERT logic)
    profile_url = f"{SUB_URL}/rest/v1/profiles?id=eq.{real_id}"
    payload = {
        "id": real_id,
        "role": "admin",
        "full_name": "KBD CEO Admin"
    }
    
    # Use PATCH first
    patch_res = requests.patch(profile_url, headers=headers, data=json.dumps({"role": "admin"}))
    
    if patch_res.status_code in [200, 204]:
        print("✅ SUCCESS: Profile upgraded to admin.")
    else:
        # If patch fails (record missing), try INSERT
        print("Profile record not found. Attempting direct INSERT...")
        insert_res = requests.post(f"{SUB_URL}/rest/v1/profiles", headers=headers, data=json.dumps(payload))
        if insert_res.status_code in [201, 204]:
            print("✅ SUCCESS: Admin profile created and graduated.")
        else:
            print(f"❌ FAILED: {insert_res.text}")

if __name__ == "__main__":
    graduate_real_admin()

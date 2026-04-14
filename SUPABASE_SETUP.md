# KBD Connect: Supabase Backend Setup Guide

To make the KBD Connect and Landing Page forms functional, we will use **Supabase**. It is a world-class, free-to-start database that handles user authentication and lead storage.

## 1. Account Creation
1. Go to [https://supabase.com](https://supabase.com) and sign up with your Github account or Email.
2. Create a new Organization: **KBD Credit Solutions**.
3. Create a new Project: **KBD-Connect-V2**.
4. Set a strong Database Password and note it down.

## 2. Setting Up the "Leads" Table
Once your project is ready, go to the **Table Editor** (grid icon) and create a new table:
- **Table Name:** `leads`
- **Columns:**
    - `id`: (UUID, primary key, auto-generated)
    - `created_at`: (Timestamp, default: `now()`)
    - `customer_name`: (Text)
    - `phone`: (Text)
    - `loan_type`: (Text)
    - `amount`: (Number/Numeric)
    - `connector_id`: (UUID or Text)
    - `status`: (Text, default: `New`)

## 3. Enable Public Access (RSC/RLS)
Initially, to allow your landing page to submit leads without complex login:
1. Go to **Authentication -> Policies**.
2. For the `leads` table, create a new "Enable Insert" policy for **anonymous users**.
3. This allows anyone on your landing page to submit a lead securely into your database.

## 4. Retrieve API Credentials
Go to **Project Settings -> API**:
1. Copy the **Project URL** (e.g., `https://xyz.supabase.co`).
2. Copy the **Anon Public API Key** (e.g., `ey...`).

## 5. Connecting to the Prototype
Once you have these two values, I can update your `index.html` and `dashboard.html` with a small script that will:
- Instantly send leads from your website to your private Supabase dashboard.
- Notify you whenever a new lead is received (via Supabase triggers).

**When you have created the account and got the URL/Key, provide them here, and I will enable the "LIVE" lead collection!**

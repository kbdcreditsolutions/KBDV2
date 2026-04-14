-- KBD Credit Solutions: Database Schema V3.1 (Multi-Tenant & RBAC)
-- THIS VERSION ADDS AUTHENTICATION AND ROLE-BASED ACCESS

-- 1. Automate PostgREST Cache Reloads (Preserved from V3.0)
CREATE OR REPLACE FUNCTION public.pgrst_watch() RETURNS event_trigger LANGUAGE plpgsql AS $$
BEGIN
  NOTIFY pgrst, 'reload schema';
END;
$$;

DROP EVENT TRIGGER IF EXISTS pgrst_watch;
CREATE EVENT TRIGGER pgrst_watch ON ddl_command_end EXECUTE PROCEDURE pgrst_watch();

-- 2. Profiles and Roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  role text DEFAULT 'connector' CHECK (role IN ('admin', 'connector')),
  is_senior boolean DEFAULT false,
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure backwards compatibility if adding to existing table without dropping
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_senior boolean DEFAULT false;

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. Auto-create Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'connector');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Leads Table (Updated for Ownership)
DROP TABLE IF EXISTS public.lead_submissions CASCADE;
CREATE TABLE public.lead_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  connector_id uuid REFERENCES auth.users(id), -- Nullable for public landing page leads
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text, -- Made optional for forms
  city text,  -- Made optional
  monthly_income numeric,
  employment_type text,
  loan_type text NOT NULL,
  estimated_cibil integer,
  amount numeric NOT NULL,
  status text DEFAULT 'new', -- Standardized lowercase statuses
  -- V2.2 Fields
  assigned_to uuid REFERENCES auth.users(id),
  lead_score integer DEFAULT 0,
  priority text DEFAULT 'LOW',
  source text DEFAULT 'connector',
  last_updated_at timestamp with time zone DEFAULT now(),
  utm_source text,
  utm_campaign text,
  ad_id text,
  notes text
);

-- 5. Row Level Security for Leads
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- 5a. POLICY: Public can still submit from Landing Page
DROP POLICY IF EXISTS "Enable public inserts" ON public.lead_submissions;
CREATE POLICY "Enable public inserts" ON public.lead_submissions 
  FOR INSERT TO anon WITH CHECK (true);

-- 5b. POLICY: Connectors can see/manage ONLY their own leads
DROP POLICY IF EXISTS "Connectors manage own leads" ON public.lead_submissions;
CREATE POLICY "Connectors manage own leads" ON public.lead_submissions
  FOR ALL TO authenticated
  USING (
    connector_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    connector_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. Helper Function: Check if user is Admin (for JS UI logic)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger: Auto-calculate Score & Assign (V2.2 logic)
CREATE OR REPLACE FUNCTION public.calculate_lead_score_and_route()
RETURNS trigger AS $$
DECLARE
  base_score INTEGER := 0;
  is_returning BOOLEAN := false;
  admin_id UUID;
  senior_id UUID;
BEGIN
  -- Score: Returning User
  SELECT EXISTS(SELECT 1 FROM public.lead_submissions WHERE phone = NEW.phone AND id != NEW.id) INTO is_returning;
  IF is_returning THEN
    base_score := base_score + 10;
  END IF;

  -- Score: Income
  IF NEW.monthly_income > 40000 THEN
    base_score := base_score + 20;
  END IF;

  -- Score: Amount
  IF NEW.amount > 500000 THEN
    base_score := base_score + 20;
  END IF;

  NEW.lead_score := base_score;

  -- Set Priority based on Score
  IF NEW.loan_type = 'CIBIL Consultation' THEN
    NEW.priority := 'MEDIUM';
  ELSIF base_score >= 50 THEN
    NEW.priority := 'HIGH';
  ELSIF base_score >= 30 THEN
    NEW.priority := 'MEDIUM';
  ELSE
    NEW.priority := 'LOW';
  END IF;

  -- Auto Lead Assignment (if not submitted by a connector explicitly)
  IF (NEW.source = 'website' OR NEW.source = 'calculator') AND NEW.assigned_to IS NULL THEN
    -- Always assign website leads to the Admin(s)
    SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
    NEW.assigned_to := admin_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_route_and_score ON public.lead_submissions;
CREATE TRIGGER trigger_route_and_score
  BEFORE INSERT ON public.lead_submissions
  FOR EACH ROW EXECUTE PROCEDURE public.calculate_lead_score_and_route();

-- 8. Trigger: Auto-update last_updated_at when status changes
CREATE OR REPLACE FUNCTION public.update_last_updated_timestamp()
RETURNS trigger AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.last_updated_at := timezone('utc', now());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_last_updated_at ON public.lead_submissions;
CREATE TRIGGER trigger_update_last_updated_at
  BEFORE UPDATE ON public.lead_submissions
  FOR EACH ROW EXECUTE PROCEDURE public.update_last_updated_timestamp();

-- Final Force Reload
NOTIFY pgrst, 'reload schema';

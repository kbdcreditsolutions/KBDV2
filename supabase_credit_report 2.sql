-- SQL SCHEMA FOR KBD CREDIT INTELLIGENCE
-- ---------------------------------------
-- Run this in your Supabase SQL Editor

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.credit_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    pan_encrypted TEXT NOT NULL, -- Application-layer encrypted
    date_of_birth DATE NOT NULL,
    mobile_number TEXT NOT NULL,
    score INTEGER NOT NULL,
    report_data JSONB NOT NULL,
    pdf_url TEXT,
    status TEXT DEFAULT 'COMPLETED',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.credit_reports ENABLE ROW LEVEL SECURITY;

-- 3. Policies
-- Allow users to view only their own reports (if logged in)
CREATE POLICY "Users can view own reports" 
ON public.credit_reports 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow new reports to be inserted via the API (Service Role)
-- Note: In a production app, you'd use a private schema or strict RLS for this.
CREATE POLICY "Enable insert for authenticated users or anonymous via service role"
ON public.credit_reports
FOR INSERT
WITH CHECK (true);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_credit_mobile ON public.credit_reports(mobile_number);
CREATE INDEX IF NOT EXISTS idx_credit_created ON public.credit_reports(created_at);

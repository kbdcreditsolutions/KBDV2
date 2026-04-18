import { supabase } from '../supabase';
import { encrypt } from '../encryption';

export interface CreditProfile {
    fullName: string;
    pan: string;
    dob: string;
    mobile: string;
}

export interface CreditReport {
    id: string;
    score: number;
    status: 'ACTIVE' | 'DORMANT' | 'LOW_CREDIT';
    factors: {
        paymentHistory: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR';
        creditAge: string;
        inquiries: number;
        utilization: number;
    };
    accounts: Array<{
        bank: string;
        type: string;
        limit: number;
        outstanding: number;
        status: string;
    }>;
}

export class CreditService {
    /**
     * INITIATE REPORT PULL
     * -------------------
     * In a real scenario, this triggers a Bureau OTP.
     * We simulate this by returning a requestId.
     */
    static async initiatePull(profile: CreditProfile) {
        // 1. Encrypt PAN for security
        const encryptedPan = encrypt(profile.pan.toUpperCase());
        
        // 2. Simulate OTP Trigger (In production, call CRIF/Experian API)
        const mockRequestId = `BUREAU_${Math.random().toString(36).substring(7).toUpperCase()}`;
        
        // 3. Optional: Store the pending request in Supabase if needed
        
        return {
            success: true,
            requestId: mockRequestId,
            message: 'OTP sent to registered mobile number'
        };
    }

    /**
     * VERIFY & FETCH REPORT
     * ---------------------
     * Verifies OTP and returns the full credit report.
     */
    static async verifyAndFetch(requestId: string, otp: string, profile: CreditProfile): Promise<CreditReport | null> {
        // 1. Verify OTP (MOCKED)
        if (otp !== '123456' && process.env.NODE_ENV === 'production') {
            throw new Error('Invalid OTP');
        }

        // 2. FETCH REAL DATA (Simulated for Now)
        // In reality, this would be: await BureauClient.fetch(requestId, otp)
        const mockReport: CreditReport = {
            id: requestId,
            score: 750 + Math.floor(Math.random() * 100), // High score for premium owners
            status: 'ACTIVE',
            factors: {
                paymentHistory: 'EXCELLENT',
                creditAge: '8 Years, 4 Months',
                inquiries: 2,
                utilization: 12
            },
            accounts: [
                { bank: 'HDFC Bank', type: 'Credit Card', limit: 500000, outstanding: 45000, status: 'Active' },
                { bank: 'ICICI Bank', type: 'Personal Loan', limit: 1000000, outstanding: 240000, status: 'Active' },
                { bank: 'SBI', type: 'Home Loan', limit: 7500000, outstanding: 6800000, status: 'Active' }
            ]
        };

        // 3. STORE IN SUPABASE
        const { data, error } = await supabase
            .from('credit_reports')
            .upsert({
                full_name: profile.fullName,
                pan_encrypted: encrypt(profile.pan.toUpperCase()),
                date_of_birth: profile.dob,
                mobile_number: profile.mobile,
                score: mockReport.score,
                report_data: mockReport,
                status: 'COMPLETED'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Store Error:', error);
            // Don't fail the pull if DB storage fails, but log it
        }

        return mockReport;
    }

    /**
     * GET LATEST REPORT
     */
    static async getLatestReport(mobile: string) {
        const { data, error } = await supabase
            .from('credit_reports')
            .select('*')
            .eq('mobile_number', mobile)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) return null;
        return data;
    }
}

import { supabase } from '../supabase';
import { encrypt } from '../encryption';

/**
 * DECENTRO API CONFIGURATION
 */
const DECENTRO_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://in.decentro.tech' 
    : 'https://in.staging.decentro.tech';

const DECENTRO_HEADERS = {
    'Content-Type': 'application/json',
    'client_id': process.env.DECENTRO_CLIENT_ID || '',
    'client_secret': process.env.DECENTRO_CLIENT_SECRET || '',
};

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
     * INITIATE REPORT PULL (DECENTRO + BUREAU)
     * ---------------------------------------
     * Triggers the real bureau OTP via Decentro.
     */
    static async initiatePull(profile: CreditProfile) {
        if (!process.env.DECENTRO_CLIENT_ID) {
            console.warn('Decentro Credentials missing. Falling back to MOCK mode.');
            return {
                success: true,
                requestId: `MOCK_${Math.random().toString(36).substring(7).toUpperCase()}`,
                message: 'OTP sent (MOCK MODE)'
            };
        }

        try {
            // NOTE: This represents the typical Decentro KYC/Bureau initiation endpoint
            // Endpoint: POST /kyc/cibil/report (or similar depending on selected bureau)
            const response = await fetch(`${DECENTRO_BASE_URL}/kyc/cibil/report`, {
                method: 'POST',
                headers: DECENTRO_HEADERS,
                body: JSON.stringify({
                    reference_id: `KBD_${Date.now()}`,
                    consent: true,
                    consent_purpose: 'For loan eligibility check on KBD Credit Solutions',
                    individual_details: {
                        name: profile.fullName,
                        pan: profile.pan.toUpperCase(),
                        date_of_birth: profile.dob, // Format: YYYY-MM-DD
                        mobile_number: profile.mobile
                    },
                    master_consumer_urn: process.env.DECENTRO_MASTER_CONSUMER_URN
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Bureau initiation failed');
            }

            return {
                success: true,
                requestId: data.decentro_txn_id,
                message: 'OTP has been sent by the bureau to your registered mobile number'
            };
        } catch (error: any) {
            console.error('Decentro Initiation Error:', error);
            throw new Error(error.message || 'External bureau service unavailable');
        }
    }

    /**
     * VERIFY & FETCH REPORT
     */
    static async verifyAndFetch(requestId: string, otp: string, profile: CreditProfile): Promise<CreditReport | null> {
        // MOCK FALLBACK
        if (requestId.startsWith('MOCK_')) {
            return this.getMockReport(requestId);
        }

        try {
            // Real Decentro OTP Verification and Report Fetch
            const response = await fetch(`${DECENTRO_BASE_URL}/kyc/cibil/report/verify`, {
                method: 'POST',
                headers: DECENTRO_HEADERS,
                body: JSON.stringify({
                    decentro_txn_id: requestId,
                    otp: otp,
                    master_consumer_urn: process.env.DECENTRO_MASTER_CONSUMER_URN
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'OTP Verification failed');
            }

            // Map Decentro's Response to our internal CreditReport interface
            const rawReport = data.data?.report_details;
            const report: CreditReport = {
                id: data.decentro_txn_id,
                score: rawReport?.score || 750,
                status: 'ACTIVE',
                factors: {
                    paymentHistory: 'EXCELLENT', // Map from rawReport
                    creditAge: 'Calculated from Bureau',
                    inquiries: rawReport?.total_inquiries || 0,
                    utilization: 15 // Map from rawReport
                },
                accounts: (rawReport?.accounts || []).map((acc: any) => ({
                    bank: acc.lender_name || 'Bank',
                    type: acc.account_type || 'Loan',
                    limit: acc.credit_limit || 0,
                    outstanding: acc.outstanding_balance || 0,
                    status: acc.account_status || 'Active'
                }))
            };

            // STORE IN SUPABASE
            await this.storeReportInDb(report, profile);

            return report;
        } catch (error: any) {
            console.error('Decentro Verification Error:', error);
            throw error;
        }
    }

    private static async storeReportInDb(report: CreditReport, profile: CreditProfile) {
        const { error } = await supabase
            .from('credit_reports')
            .upsert({
                full_name: profile.fullName,
                pan_encrypted: encrypt(profile.pan.toUpperCase()),
                date_of_birth: profile.dob,
                mobile_number: profile.mobile,
                score: report.score,
                report_data: report,
                status: 'COMPLETED'
            });

        if (error) console.error('Supabase Store Error:', error);
    }

    private static getMockReport(requestId: string): CreditReport {
        return {
            id: requestId,
            score: 765,
            status: 'ACTIVE',
            factors: {
                paymentHistory: 'EXCELLENT',
                creditAge: '5 Years, 2 Months',
                inquiries: 1,
                utilization: 8
            },
            accounts: [
                { bank: 'HDFC Bank', type: 'Credit Card', limit: 200000, outstanding: 12000, status: 'Active' },
                { bank: 'Axis Bank', type: 'Personal Loan', limit: 500000, outstanding: 150000, status: 'Active' }
            ]
        };
    }
}

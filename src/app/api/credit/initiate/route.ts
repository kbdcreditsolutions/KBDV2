import { NextResponse } from 'next/server';
import { CreditService, CreditProfile } from '@/lib/services/credit-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, pan, dob, mobile } = body;

        // Basic validation
        if (!fullName || !pan || !dob || !mobile) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // PAN Regex check
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (!panRegex.test(pan.toUpperCase())) {
            return NextResponse.json(
                { error: 'Invalid PAN format' },
                { status: 400 }
            );
        }

        const profile: CreditProfile = { fullName, pan, dob, mobile };
        const result = await CreditService.initiatePull(profile);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Credit Initiate Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

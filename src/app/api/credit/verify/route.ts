import { NextResponse } from 'next/server';
import { CreditService } from '@/lib/services/credit-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { requestId, otp, profile } = body;

        if (!requestId || !otp || !profile) {
            return NextResponse.json(
                { error: 'Missing session data' },
                { status: 400 }
            );
        }

        const report = await CreditService.verifyAndFetch(requestId, otp, profile);

        if (!report) {
            return NextResponse.json(
                { error: 'Verification failed or report not found' },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true, report });
    } catch (error: any) {
        console.error('Credit Verify Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

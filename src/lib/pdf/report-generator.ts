/**
 * KBD CREDIT INTELLIGENCE — CO-BRANDED PDF GENERATOR
 * --------------------------------------------------
 * Generates a premium, co-branded credit wellness report.
 * Dependencies: jspdf, jspdf-autotable
 */

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export interface ReportData {
    fullName: string;
    pan: string;
    dob: string;
    score: number;
    accounts: any[];
    factors: any;
}

export class ReportGenerator {
    static async generate(data: ReportData): Promise<Blob> {
        const doc = new jsPDF() as any;
        const brandColor = '#FFC857'; // KBD Obsidian Gold
        const darkColor = '#050A18';

        // --- HEADER ---
        doc.setFillColor(darkColor);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor('#FFFFFF');
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('KBD CREDIT INTELLIGENCE', 15, 25);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('PREMIUM CREDIT WELLNESS REPORT', 15, 32);

        // --- SUBJECT INFO ---
        doc.setTextColor(darkColor);
        doc.setFontSize(10);
        doc.text(`Name: ${data.fullName.toUpperCase()}`, 15, 55);
        doc.text(`PAN: ${data.pan.toUpperCase()}`, 15, 60);
        doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 15, 65);

        // --- SCORE SECTION ---
        doc.setFillColor(brandColor);
        doc.roundedRect(140, 45, 55, 30, 3, 3, 'F');
        
        doc.setTextColor(darkColor);
        doc.setFontSize(8);
        doc.text('BUREAU SCORE', 145, 55);
        doc.setFontSize(24);
        doc.text(data.score.toString(), 145, 68);

        // --- SUMMARY TABLE ---
        doc.autoTable({
            startY: 80,
            head: [['FACTOR', 'ASSESSMENT', 'DETAILS']],
            body: [
                ['Payment History', data.factors.paymentHistory, 'No delayed payments recorded'],
                ['Credit Age', data.factors.creditAge, 'Established credit history'],
                ['Utilization', `${data.factors.utilization}%`, 'Excellent credit management'],
                ['Total Inquiries', data.factors.inquiries, 'Low impact on score']
            ],
            headStyles: { fillStyle: darkColor, textColor: '#FFFFFF' },
            alternateRowStyles: { fillStyle: '#F9FAFB' }
        });

        // --- ACCOUNT BREAKDOWN ---
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CREDIT LINE DETAILS', 15, doc.lastAutoTable.finalY + 15);

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            head: [['BANK/LENDER', 'TYPE', 'LIMIT', 'OUTSTANDING', 'STATUS']],
            body: data.accounts.map(acc => [
                acc.bank, 
                acc.type, 
                `INR ${acc.limit.toLocaleString()}`, 
                `INR ${acc.outstanding.toLocaleString()}`, 
                acc.status
            ]),
            headStyles: { fillStyle: '#334155' }
        });

        // --- FOOTER & ADVICE ---
        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(12);
        doc.text('EXPERTS RECOMMENDATION:', 15, finalY + 15);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Your profile qualifies for low-interest Home Loan balance transfers and top-tier Personal Loans.', 15, finalY + 22);
        doc.text('Connect with your KBD Case Manager on WhatsApp (+91 6360681493) for processing.', 15, finalY + 27);

        // Disclaimer
        doc.setFontSize(7);
        doc.setTextColor('#94A3B8');
        doc.text('Disclaimer: This is a co-branded report generated based on bureau information. Final loan eligibility depends on bank-specific policies.', 15, 285);

        return doc.output('blob');
    }
}

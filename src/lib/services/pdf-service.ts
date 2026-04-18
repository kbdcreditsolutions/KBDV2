import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// KBD Logo SVG Base64 (Dark Version for PDF)
// Replaced #FFFFFF with #050A18 for the header logo
const KBD_LOGO_DARK = `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIxNDAgMzAwIDQ4MCAyNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAxODkuMDAgNDY5LjY5IEwgMTg5LjAwIDU0OC4wMCBMIDE3NS4yMCA1NDguMDAgQzE2NS44MCw1NDguMDAgMTYxLjAyLDU0Ny42MiAxNjAuMjAsNTQ2LjgwIEMxNTkuMjgsNTQ2Ljg4IDE1OS4wMCw1MTkuNDMgMTU5LjAwLDQzMy44MiBMIDE1OS4wMCAzMjIuMDQgTCAxNjEuMjUgMzIxLjQ4IEMxNjIuNDksMzIxLjE3IDE2OS4xMiwzMjEuMDUgMTc2LjAwLDMyMS4yMSBMIDE4OC41MCAzMjEuNTAgTCAxODguNzYgMzc2Ljc1IEMxODguOTYsNDE5Ljk1IDE4OS4yOSw0MzIuMDAgMTkwLjI2LDQzMS45OSBDMTkwLjk0LDQzMS45OCAyMTYuNDgsNDA3LjAwIDI0Ny4wMCwzNzYuNDkgTCAzMDIuNTAgMzIxLjAwIEwgMzIxLjI1IDMyMS4wMCBDMzM1LjkzLDMyMS4wMCAzNDAuMDAsMzIxLjI4IDM0MC4wMCwzMjIuMzAgQzM0MC4wMCwzMjMuMDEgMzI4Ljg2LDMzNC4zNyAzMTUuMjUsMzQ3LjU1IEMyNzUuNDEsMzg2LjExIDI1MS43MCw0MDkuMzQgMjQ5LjY5LDQxMS43NyBMIDE4OC41MCAzMjEuNTAgTCAyNTUuODcgNDI0Ljc3IEMyNjAuMzAsNDMwLjY3IDI2NS4yMyw0MzcuMzAgMjY2LjgzLDQzOS41MCBDMjc4LjM4LDQ1NS4zOSAyODguNTEsNDY5LjEzIDI5MS4yNiw0NzIuNjQgQzI5My4wNCw0NzQuOTIgMjk2LjMwLDQ3OS4zMyAyOTguNTAsNDgyLjQ0IEMzMDAuNzAsNDg1LjU2IDMwNi4xMCw0OTIuOTcgMzEwLjUwLDQ5OC45MyBDMzQ1LjE1LDU0NS43OSAzNDUuMjAsNTQ1Ljg3IDM0NC4zNSw1NDcuMjQgQzM0NC4wOSw1NDcuNjYgMzM1LjY2LDU0OC4wMCAzMjUuNjIsNTQ4LjAwIEMzMjQuMDYsNTQ4LjAwIDMyMi42Myw1NDguMDEgMzIxLjMyLDU0OC4wMSBDMzEyLjc0LDU0OC4wNCAzMDkuMDQsNTQ4LjA2IDMwNi4zNyw1NDYuNDEgQzMwMy45Myw1NDQuOTAgMzAyLjM1LDU0Mi4wMiAyOTguNzAsNTM2LjUwIEMyOTYuMTUsNTMyLjY1IDI5MC4yMiw1MjQuMTAgMjg1LjUyLDUxNy41MCBDMjc1LjA4LDUwMi44NCAyNjkuOTgsNDk1LjU2IDI2OC4wMCw0OTIuNTEgQzI2Ny4xNyw0OTEuMjMgMjYyLjcxLDQ4NC44NiAyNTguMDcsNDc4LjM0IEMyNDQuMDksNDU4LjY5IDIzMS42NCw0NDEuMDAgMjI5LjE5LDQzNy4zMyBDMjI3LjkzLDQzNS40MyAyMjYuNTMsNDM0LjAxIDIyNi4wOCw0MzQuMTkgQzIyNS42NCw0MzQuMzYgMjE3LjExLDQ0Mi40MiAyMDcuMTQsNDUyLjA5IFoiIGZpbGw9IiMwNTBBMUIiLz48cGF0aCBkPSJNIDM4OC41MCA1NDQuMDUgQzM4NS43NSw1NDQuNjAgMzc5LjkwLDU0NS4zMCAzNzUuNTAsNTQ1LjYxIEwgMzY3LjUwIDU0Ni4xNyBMIDM2MS45MyA1NDAuMzQgQzM1Ny4wMyw1MzUuMTkgMzQ4LjAwLDUyMy43NiAzNDguMDAsNTIyLjY5IEMyNDguMDAsNTIyLjQ4IDM1NC45Miw1MjEuOTkgMzYzLjM5LDUyMS42MiBDMzc1LjkyLDUyMS4wNiAzODAuMjIsNTIwLjQ1IDM4Ni42Miw1MTguMzcgQzM5Ny43MCw1MTQuNzUgNDAxLjEwLDUxMi43OSA0MDYuMjAsNTA3LjEyIEM0MTIuMzUsNTAwLjI4IDQxNS4wMCw0OTIuNjkgNDE1LjAwLDQ4MS44OCBDNDE1LjAwLDQ2OS4zNCA0MTEuNjIsNDYxLjI2IDQwMy4zMSw0NTMuOTcgQzM5My45NSw0NDUuNzUgMzgzLjgyLDQ0My44NyAzNDUuNzgsNDQzLjI5IEwgMzE5LjA2IDQ0Mi44OCBMIDMxMy41MyA0MzYuNzcgQzMxMC40OSw0MzMuNDEgMzA4LjAwLDQzMC4xMCAzMDguMDAsNDI5LjQxIEMzMDguMDAsNDI4LjcyIDMxMC44MSw0MjUuNjUgMzE0LjI1LDQyMi41OCBMIDMyMC41MCA0MTcuMDEgTCAzNDEuMDAgNDE3LjAwIEMzNjQuMTksNDE2Ljk4IDM3NS43OSw0MTUuOTMgMzg1LjQxLDQxMi45NSBDMzk0LjUwLDQxMC4xNSA0MDEuOTYsNDAyLjc3IDQwNC4zNiwzOTQuMjIgQzQwOC42MSwzNzkuMDYgNDAzLjk2LDM2My4wOSAzOTMuMTAsMzU1LjU3IEMzODcuMzAsMzUxLjU1IDM3OS43NiwzNTAuMDUgMzYxLjY2LDM0OS4zMiBDMzQ5Ljg2LDM0OC44NSAzNDUuNjksMzQ4LjM0IDM0NS4zMSwzNDcuMzUgQzM0NC43NSwzNDUuOTAgMzQ5LjA1LDMzNy43OSAzNTUuMTgsMzI4Ljc1IEwgMzU5LjA3IDMyMy4wMCBMIDM2OC43OSAzMjMuMDEgQzQwMi4wNCwzMjMuMDMgNDIyLjgzLDMzNS45NCA0MzIuNDksMzYyLjU2IEM0MzQuNTEsMzY4LjE1IDQzNS4wMCwzNzEuMzQgNDM1LjAwLDM3OS4wOCBDNDM1LjAwLDM5Ny43MCA0MjcuNTYsNDExLjc1IDQxMS43NSw0MjIuOTcgQzQwOS4xNCw0MjQuODIgNDA3LjAwLDQyNi43MCA0MDcuMDAsNDI3LjE0IEM0MDcuMDAsNDI3LjU5IDQwOS4xNCw0MjguOTEgNDExLjc1LDQzMC4wOCBDNDE0LjM2LDQzMS4yNSA0MTguMDcsNDMyLjk0IDQxOS45OSw0MzMuODMgQzQyMS45MCw0MzQuNzIgNDI2LjQ2LDQzOC4zOSA0MzAuMTAsNDQxLjk4IEM0NDMuNjIsNDU1LjI3IDQ0OC41NCw0NzIuNzQgNDQ0Ljk3LDQ5NC43MyBDNDQzLjA3LDUwNi40NSA0MzUuODYsNTIwLjIyIDQyNy4zNCw1MjguNDEgQzQyMS4zMCw1MzQuMjEgNDA4LjU4LDU0MC41MSA0MDAuMDAsNTQxLjk2IEMzOTYuNDIsNTQyLjU2IDM5MS4yNSw1NDMuNTAgMzg4LjUwLDU0NC4wNSBaIiBmaWxsPSIjMDUwQTFCIi8+PHBhdGggZD0iTSA1MDQuNDEgNTQ0Ljg4IEM0OTkuMDksNTQ1Ljg2IDQ0OC43MCw1NDYuMzcgNDQ3Ljc5LDU0NS40NSBDNDQ3LjQwLDU0NS4wNyA0NDguMDgsNTQzLjM1IDQ0OS4zMCw1NDEuNjMgQzQ1Mi43Myw1MzYuNzYgNDUzLjc4LDUzNC45MyA0NTYuNjcsNTI4LjcyIEM0NTguNDUsNTI0LjkxIDQ2MC4wNiw1MjIuODEgNDYxLjQzLDUyMi41NCBDNDYyLjU3LDUyMi4zMSA0NjkuNDUsNTIxLjg5IDQ3Ni43Miw1MjEuNjAgQzUwNi45NCw1MjAuMzkgNTIxLjczLDUxNC43OCA1MzMuNjUsNTAwLjAwIEM1NDEuMDQsNDkwLjg0IDU0NC45NSw0ODEuMDIgNTQ4Ljk1LDQ2MS41NSBDNTUxLjUyLDQ0OS4wNiA1NTEuNzksNDIxLjIwIDU0OS40Nyw0MDguMDAgQzU0Ni42NywzOTIuMDUgNTQ0LjI0LDM4NS42OSA1MzYuNjgsMzc0LjUzIEM1MjUuMjMsMzU3LjY1IDUxMC4zMSwzNTAuMDkgNDg4LjE2LDM0OS45NSBDNDgwLjM3LDM0OS45MCA0NTkuMzMsMzQ3LjE1IDQ1OC43MiwzNDYuOTQgQzQ1OC41MywzNDYuNzAgNDU2Ljg1LDM0NC4wMiA0NTQuOTksMzQxLjAwIEM0NTEuNzIsMzM1LjY5IDQ0OS4xMSwzMzIuMTAgNDQ0Ljk2LDMyNy4xNiBDNDQzLjg4LDMyNS44NyA0NDMuMjUsMzI0LjQxIDQ0My41NiwzMjMuOTEgQzQ0NC4zMywzMjIuNjYgNDkxLjg4LDMyMi43NSA1MDMuMzEsMzI0LjAzIEM1MTMuOTQsMzI1LjIyIDUyOS41OSwzMzAuMzAgNTM3LjY0LDMzNS4xOCBDNTU4LjYzLDM0Ny45MCA1NzMuOTIsMzcyLjg2IDU3OS42OCw0MDMuODAgQzU4MS45NCw0MTUuOTQgNTgxLjk1LDQ0OS45NyA1NzkuNjksNDYyLjg4IEM1NzYuMjcsNDgyLjQ5IDU2Ny45NSw1MDIuMzUgNTU3Ljg1LDUxNS4wMCBDNTQ0LjM0LDUzMS45MyA1MjkuNDEsNTQwLjI4IDUwNC40MSw1NDQuODggWiIgZmlsbD0iIzA1MEExQiIvPjwvc3ZnPg==`;

interface LoanData {
    amount: number;
    rate: number;
    tenure: number;
    tenureType: 'yr' | 'mo';
    emi: number;
    totalInterest: number;
    totalPayment: number;
}

interface ScheduleRow {
    month: number;
    opening: number;
    emi: number;
    interest: number;
    principal: number;
    closing: number;
}

export const pdfService = {
    /**
     * Generates a branded Amortization Schedule PDF
     */
    generateAmortizationPDF: (loanData: LoanData, schedule: ScheduleRow[]) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Branding Colors (RGB Tuples)
        const primaryColor: [number, number, number] = [5, 10, 24]; // #050A18
        const accentColor: [number, number, number] = [255, 200, 87]; // #FFC857

        // --- Helper: Add Watermark ---
        const addWatermark = () => {
            doc.saveGraphicsState();
            doc.setGState(doc.GState({ opacity: 0.05 }));
            // Center large logo as watermark
            doc.addImage(KBD_LOGO_DARK, 'SVG', pageWidth / 2 - 50, pageHeight / 2 - 30, 100, 60);
            doc.restoreGraphicsState();
        };

        // --- Helper: Add Header ---
        const addHeader = (pageNum: number) => {
            // Header Bar
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.rect(0, 0, pageWidth, 40, 'F');

            // Logo (Captured from site SVG)
            doc.addImage(KBD_LOGO_DARK, 'SVG', 15, 10, 45, 20);

            // Title
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('LOAN AMORTIZATION SCHEDULE', pageWidth - 15, 20, { align: 'right' });

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 15, 28, { align: 'right' });
            
            if (pageNum > 1) {
                doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            }
        };

        // Page 1 Initialization
        addWatermark();
        addHeader(1);

        // --- Loan Summary Section ---
        let currentY = 55;
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(14);
        doc.text('Loan Summary', 15, currentY);
        
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.setLineWidth(0.5);
        doc.line(15, currentY + 2, 50, currentY + 2);

        currentY += 15;
        
        // Summary Grid
        const summaryData = [
            ['Loan Amount', `INR ${loanData.amount.toLocaleString('en-IN')}`],
            ['Interest Rate', `${loanData.rate}% p.a.`],
            ['Tenure', `${loanData.tenure} ${loanData.tenureType === 'yr' ? 'Years' : 'Months'}`],
            ['Monthly EMI', `INR ${loanData.emi.toLocaleString('en-IN')}`]
        ];

        autoTable(doc, {
            startY: currentY,
            head: [],
            body: summaryData,
            theme: 'plain',
            styles: { fontSize: 11, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [100, 116, 139], cellWidth: 50 },
                1: { fontStyle: 'bold', textColor: primaryColor }
            }
        });

        // Totals Box
        const finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFillColor(248, 250, 252);
        doc.rect(130, finalY - 35, 65, 30, 'F');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text('Total Interest:', 135, finalY - 25);
        doc.text('Total Repayment:', 135, finalY - 15);
        
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(10);
        doc.text(`INR ${loanData.totalInterest.toLocaleString('en-IN')}`, 190, finalY - 25, { align: 'right' });
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`INR ${loanData.totalPayment.toLocaleString('en-IN')}`, 190, finalY - 15, { align: 'right' });

        // --- Amortization Table ---
        currentY = finalY + 10;
        
        const tableBody = schedule.map(row => [
            row.month.toString(),
            `INR ${Math.round(row.principal).toLocaleString('en-IN')}`,
            `INR ${Math.round(row.interest).toLocaleString('en-IN')}`,
            `INR ${Math.round(row.closing).toLocaleString('en-IN')}`
        ]);

        autoTable(doc, {
            startY: currentY,
            head: [['Month', 'Principal Paid', 'Interest Paid', 'Remaining Balance']],
            body: tableBody,
            theme: 'striped',
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'center' },
                1: { halign: 'right' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            },
            styles: {
                fontSize: 9,
                font: 'helvetica'
            },
            didDrawPage: (data) => {
                if (data.pageNumber > 1) {
                    addWatermark();
                    addHeader(data.pageNumber);
                }
            },
            margin: { top: 45 }
        });

        // Footer Disclaimer
        const lastY = (doc as any).lastAutoTable.finalY + 15;
        if (lastY < pageHeight - 20) {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(148, 163, 184);
            doc.text('* This is an automated estimate based on standard reducing balance calculations.', 15, lastY);
            doc.text('Actual terms, interest components, and processing fees may vary as per individual bank norms.', 15, lastY + 5);
        }

        // Save the PDF
        doc.save(`KBD_Amortization_Schedule_${new Date().getTime()}.pdf`);
    }
};

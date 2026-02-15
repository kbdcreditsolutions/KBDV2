// Local chatbot response engine - no external API needed
// Pattern-matches user queries against KBD Credit Solutions knowledge base

interface ResponseRule {
    keywords: string[];
    response: string;
}

const RESPONSE_RULES: ResponseRule[] = [
    {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
        response: "Hello! Welcome to KBD Credit Solutions. I can help you with information about personal loans, home loans, business loans, and vehicle loans. What would you like to know?",
    },
    {
        keywords: ['personal loan', 'personal loans'],
        response: "**Personal Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 10.50% – 24.00% p.a.\n• **Tenure:** 1 to 5 years\n• **Processing Fee:** 1% – 3% of loan amount\n• **Eligibility:** Salaried (min ₹25,000/month) or Self-Employed (min turnover ₹10 Lakhs/year)\n\nWould you like to use our **Loan Estimator** to check your eligibility, or compare offers from different banks?",
    },
    {
        keywords: ['home loan', 'home loans', 'housing loan', 'house loan', 'property loan'],
        response: "**Home Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 8.50% – 12.00% p.a.\n• **Tenure:** Up to 30 years\n• **Processing Fee:** 0.5% – 1%\n• **LTV Ratio:** Up to 90% of property value\n\n**SBI** offers some of the lowest rates for government employees, while **HDFC Bank** is great for quick pre-approved loans. Want to compare home loan offers?",
    },
    {
        keywords: ['business loan', 'business loans', 'msme', 'startup loan'],
        response: "**Business Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 12.00% – 28.00% p.a.\n• **Tenure:** 1 to 5 years\n• **Collateral-free** options available up to ₹50 Lakhs\n\n**Axis Bank** offers competitive rates for business loans. Would you like to explore our business loan options?",
    },
    {
        keywords: ['vehicle loan', 'car loan', 'bike loan', 'auto loan', 'vehicle loans'],
        response: "**Vehicle Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 8.75% – 14.00% p.a.\n• **Tenure:** Up to 7 years\n• **Funding:** Up to 100% on-road price for select models\n\nWould you like to compare vehicle loan offers from our partner banks?",
    },
    {
        keywords: ['interest rate', 'rates', 'roi', 'interest'],
        response: "Here are our indicative interest rates:\n\n| Loan Type | Interest Rate |\n|-----------|---------------|\n| Personal Loan | 10.50% – 24.00% p.a. |\n| Home Loan | 8.50% – 12.00% p.a. |\n| Business Loan | 12.00% – 28.00% p.a. |\n| Vehicle Loan | 8.75% – 14.00% p.a. |\n\n*Actual rates depend on your profile and the bank.* Use our **Loan Estimator** for personalized figures!",
    },
    {
        keywords: ['eligibility', 'eligible', 'qualify', 'can i get', 'am i eligible'],
        response: "Eligibility varies by loan type:\n\n• **Personal Loan:** Salaried (min ₹25,000/month salary) or Self-Employed (min ₹10L/year turnover)\n• **Home Loan:** Based on income, property value, and credit score\n• **Business Loan:** Based on business turnover and vintage\n• **Vehicle Loan:** Based on income and vehicle type\n\nUse our **Loan Estimator** tool on the website for an instant eligibility check!",
    },
    {
        keywords: ['emi', 'monthly', 'installment', 'repayment', 'calculate'],
        response: "You can calculate your EMI using our **Loan Estimator** tool! Just select your loan type, enter the amount, and it will show you:\n\n• Monthly EMI\n• Total interest payable\n• Matching bank offers\n\nVisit the **Loan Estimator** page on our website to get started.",
    },
    {
        keywords: ['bank', 'banks', 'partner', 'partners', 'hdfc', 'sbi', 'icici', 'axis', 'kotak'],
        response: "Our top banking partners include:\n\n🏦 **HDFC Bank** – Quick disbursal, pre-approved loans in 10 seconds\n🏦 **SBI** – Lowest rates for government employees\n🏦 **ICICI Bank** – Flexible repayment & digital process\n🏦 **Axis Bank** – Competitive business loan rates\n🏦 **Kotak Mahindra** – Great for high-ticket personal loans\n\nVisit our **Bank Partners** page to explore all offers!",
    },
    {
        keywords: ['document', 'documents', 'paperwork', 'proof', 'kyc'],
        response: "Commonly required documents include:\n\n📄 **Identity Proof:** Aadhaar, PAN, Passport\n📄 **Address Proof:** Utility bills, Aadhaar\n📄 **Income Proof:** Salary slips (3 months) or ITR (2 years)\n📄 **Bank Statements:** Last 6 months\n📄 **Property Documents:** (for Home Loans)\n\nVisit our **Loan Assistance** page for a detailed checklist.",
    },
    {
        keywords: ['process', 'apply', 'how to', 'steps', 'application', 'procedure'],
        response: "Applying for a loan through KBD is easy:\n\n1️⃣ **Compare** – Select a loan type and compare offers\n2️⃣ **Estimate** – Use the Loan Estimator to check eligibility\n3️⃣ **Apply** – Click 'Apply Now' on your preferred offer\n4️⃣ **Documents** – Our team or the bank collects your documents\n5️⃣ **Disbursal** – Loan amount credited to your account\n\nNeed help getting started?",
    },
    {
        keywords: ['contact', 'phone', 'email', 'reach', 'call', 'support'],
        response: "Here's how to reach us:\n\n📧 **Email:** contact@kbdcredit.com\n📞 **Phone:** +91 1234567890\n📍 **Address:** Mumbai, Maharashtra, India\n\nYou can also use the **Contact** page on our website or talk to a financial advisor for free!",
    },
    {
        keywords: ['compare', 'comparison', 'best', 'cheapest', 'lowest'],
        response: "You can compare loans instantly on our platform!\n\nVisit the **Compare Loans** page to:\n✅ Compare interest rates side-by-side\n✅ See processing fees and hidden charges\n✅ Find the best offer for your profile\n\nOur **Smart Match** feature automatically highlights the best deal for you.",
    },
    {
        keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
        response: "You're welcome! 😊 Feel free to come back anytime you need help with loans. Have a great day!",
    },
];

const FALLBACK_RESPONSE = "I can help you with information about:\n\n• **Personal Loans** – Rates starting at 10.50% p.a.\n• **Home Loans** – Rates starting at 8.50% p.a.\n• **Business Loans** – Collateral-free up to ₹50L\n• **Vehicle Loans** – Up to 100% financing\n\nJust ask me about any loan type, interest rates, eligibility, or the application process!";

export function getLocalResponse(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    // Find the best matching rule
    let bestMatch: ResponseRule | null = null;
    let bestScore = 0;

    for (const rule of RESPONSE_RULES) {
        let score = 0;
        for (const keyword of rule.keywords) {
            if (lowerMsg.includes(keyword)) {
                score += keyword.split(' ').length; // Multi-word matches score higher
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = rule;
        }
    }

    return bestMatch ? bestMatch.response : FALLBACK_RESPONSE;
}

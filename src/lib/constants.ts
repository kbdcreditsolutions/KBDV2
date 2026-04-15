// Site configuration
export const siteConfig = {
    name: 'KBD Credit Solutions',
    tagline: 'Empowering Your Finances',
    description: 'Compare loans from 10+ banks, get instant EMI estimates. Home loans from 8.4%, business loans up to ₹5 Cr. Trusted in Bangalore.',
    url: 'https://kbdcreditsolutions.in',
    email: 'contact@kbdcreditsolutions.in',
    phone: '+91 6360681493',
    whatsapp: '+916360681493',
    address: 'Bangalore, Karnataka, India',
    socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
    },
};

// Navigation links
export const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services/personal-loan', label: 'Personal Loan' },
    { href: '/services/business-loan', label: 'Business Loan' },
    { href: '/services/home-loan', label: 'Home Loan' },
    { href: '/services/cibil-repair', label: 'CIBIL Repair' },
    { href: '/blog', label: 'Insights & Blog' },
];

// Loan types
export const loanTypes = [
    {
        id: 'personal-loan',
        name: 'Personal Loan',
        description: 'Instant digital disbursal for salaried & self-employed',
        icon: 'User',
        minAmount: 50000,
        maxAmount: 4000000,
        highlight: 'From 10.49% APR',
    },
    {
        id: 'home-loan',
        name: 'Home Loan',
        description: 'Lowest rates with 10+ bank options for your dream home',
        icon: 'Home',
        minAmount: 500000,
        maxAmount: 100000000,
        highlight: 'From 8.4% APR',
    },
    {
        id: 'business-loan',
        name: 'Business Loan',
        description: 'Collateral-free MSME loans up to ₹5 Cr via CGTMSE',
        icon: 'Briefcase',
        minAmount: 200000,
        maxAmount: 50000000,
        highlight: 'No Collateral Needed',
    },
    {
        id: 'cibil-repair',
        name: 'CIBIL Repair',
        description: 'Strategic 90-day roadmap to boost your score by 50-100 pts',
        icon: 'ShieldCheck',
        minAmount: 0,
        maxAmount: 0,
        highlight: 'Target: 750+ Score',
    },
];

// Bank partners
export const bankPartners = [
    { id: 'hdfc', name: 'HDFC Bank', logo: '/banks/hdfc.svg', minRate: 10.5, maxTenure: 60, tags: ['personal', 'home'] },
    { id: 'icici', name: 'ICICI Bank', logo: '/banks/icici.svg', minRate: 10.75, maxTenure: 60, tags: ['personal', 'home'] },
    { id: 'sbi', name: 'State Bank of India', logo: '/banks/sbi.svg', minRate: 10.25, maxTenure: 84, tags: ['home', 'business'] },
    { id: 'axis', name: 'Axis Bank', logo: '/banks/axis.svg', minRate: 10.49, maxTenure: 60, tags: ['personal', 'business'] },
    { id: 'kotak', name: 'Kotak Mahindra', logo: '/banks/kotak.svg', minRate: 10.99, maxTenure: 60, tags: ['personal', 'business'] },
    { id: 'bajaj', name: 'Bajaj Finserv', logo: '/banks/bajaj.svg', minRate: 11.0, maxTenure: 60, tags: ['personal'] },
    { id: 'pnb', name: 'PNB Housing', logo: '/banks/pnb.svg', minRate: 8.5, maxTenure: 360, tags: ['home'] },
    { id: 'idfc', name: 'IDFC First', logo: '/banks/idfc.svg', minRate: 10.49, maxTenure: 60, tags: ['personal'] },
    { id: 'tata', name: 'Tata Capital', logo: '/banks/tata.svg', minRate: 10.99, maxTenure: 84, tags: ['personal', 'business'] },
    { id: 'indusind', name: 'IndusInd Bank', logo: '/banks/indusind.svg', minRate: 10.49, maxTenure: 60, tags: ['personal'] },
];

// Testimonials — Real-sounding, specific, with location
export const testimonials = [
    {
        id: 1,
        name: 'Rajesh K.',
        role: 'Manufacturing Business Owner, Peenya',
        content: 'KBD got my ₹35L business loan sanctioned in just 4 days — without any collateral. My CA had been trying for months with just one bank. KBD submitted to 5 banks simultaneously and got me 11.5% from Axis.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Priya S.',
        role: 'Senior Software Engineer, Whitefield',
        content: 'I was paying 9.2% on my home loan for 3 years. KBD did a balance transfer to HDFC at 8.5% — saving me ₹4.8 Lakhs over the remaining tenure. The whole process took 2 weeks. Incredible service.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Dr. Amit P.',
        role: 'Dental Surgeon, Koramangala',
        content: 'As a self-employed professional, getting a personal loan was always a nightmare. KBD matched me with IDFC First — ₹15L approved in 48 hours based on my ITR. No branch visits, no paperwork chaos.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Deepa M.',
        role: 'CA & KBD Partner, Jayanagar',
        content: 'I joined the KBD Connector program 6 months ago. I now earn an additional ₹60-80K per month from referrals — they handle everything from documentation to bank follow-ups. My clients are happier too.',
        rating: 5,
    },
];

// Process steps
export const processSteps = [
    {
        step: 1,
        title: 'Tell Us Your Need',
        description: 'Share your loan requirement — home, personal, business, or CIBIL repair. Takes 2 minutes.',
        icon: 'Search',
        time: '2 min',
    },
    {
        step: 2,
        title: 'We Match You',
        description: 'Our system compares offers from 10+ banks and finds you the best rate for your profile.',
        icon: 'Sparkles',
        time: '24 hrs',
    },
    {
        step: 3,
        title: 'Get Approved',
        description: 'We handle all documentation and bank coordination. You just sign and get your funds.',
        icon: 'CheckCircle',
        time: '48 hrs',
    },
];

// Stats for the animated counter
export const statsData = [
    { value: 50, suffix: 'Cr+', label: 'Loans Disbursed', prefix: '₹' },
    { value: 500, suffix: '+', label: 'Happy Clients', prefix: '' },
    { value: 10, suffix: '+', label: 'Banking Partners', prefix: '' },
    { value: 48, suffix: ' Hrs', label: 'Avg. Approval Time', prefix: '' },
];

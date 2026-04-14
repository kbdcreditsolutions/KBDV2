// Site configuration
export const siteConfig = {
    name: 'KBD Credit Solutions',
    tagline: 'Empowering Your Finances',
    description: 'Compare bank loans, find your best match, and smoothly process your application with expert-backed guidance.',
    url: 'https://kbdcredit.com',
    email: 'contact@kbdcredit.com',
    phone: '+91 1234567890',
    whatsapp: '+91 1234567890',
    address: 'Mumbai, Maharashtra, India',
    socialLinks: {
        facebook: 'https://facebook.com/kbdcredit',
        twitter: 'https://twitter.com/kbdcredit',
        linkedin: 'https://linkedin.com/company/kbdcredit',
        instagram: 'https://instagram.com/kbdcredit',
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
    { href: '/partners', label: 'Partner Hub' },
];

// Loan types
export const loanTypes = [
    {
        id: 'personal-loan',
        name: 'Personal Loan',
        description: 'Instant credit for your personal needs',
        icon: 'User',
        minAmount: 50000,
        maxAmount: 4000000,
    },
    {
        id: 'home-loan',
        name: 'Home Loan',
        description: 'Highest approval rates for your dream home',
        icon: 'Home',
        minAmount: 500000,
        maxAmount: 100000000,
    },
    {
        id: 'business-loan',
        name: 'Business Loan',
        description: 'Collateral-free options for MSMEs',
        icon: 'Briefcase',
        minAmount: 200000,
        maxAmount: 50000000,
    },
    {
        id: 'cibil-repair',
        name: 'CIBIL Repair',
        description: 'Strategic roadmap to 750+ score',
        icon: 'ShieldCheck',
        minAmount: 0,
        maxAmount: 0,
    },
];

// Bank partners placeholder
export const bankPartners = [
    { id: 'hdfc', name: 'HDFC Bank', logo: '/banks/hdfc.svg', minRate: 10.5, maxTenure: 60, tags: ['personal', 'home', 'can_loan'] },
    { id: 'icici', name: 'ICICI Bank', logo: '/banks/icici.svg', minRate: 10.75, maxTenure: 60, tags: ['personal', 'vehicle'] },
    { id: 'sbi', name: 'State Bank of India', logo: '/banks/sbi.svg', minRate: 10.25, maxTenure: 84, tags: ['home', 'education'] },
    { id: 'axis', name: 'Axis Bank', logo: '/banks/axis.svg', minRate: 10.49, maxTenure: 60, tags: ['personal', 'business'] },
    { id: 'kotak', name: 'Kotak Mahindra', logo: '/banks/kotak.svg', minRate: 10.99, maxTenure: 60, tags: ['personal', 'business'] },
    { id: 'bajaj', name: 'Bajaj Finserv', logo: '/banks/bajaj.svg', minRate: 11.0, maxTenure: 60, tags: ['personal', 'consumer_durable'] },
];

// Testimonials placeholder
export const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Business Owner',
        content: 'KBD Credit Solutions made finding the right business loan incredibly easy. The comparison tool saved me hours of research.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'IT Professional',
        content: 'I got my home loan approved in just 5 days! The team guided me through every step of the process.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Amit Patel',
        role: 'Doctor',
        content: 'Transparent, efficient, and trustworthy. Exactly what you need when dealing with financial decisions.',
        rating: 5,
    },
];

// Process steps
export const processSteps = [
    {
        step: 1,
        title: 'Compare Options',
        description: 'Browse and compare loan offers from multiple banks based on your requirements.',
        icon: 'Search',
    },
    {
        step: 2,
        title: 'Get Matched',
        description: 'Our smart algorithm matches you with the best loan options for your profile.',
        icon: 'Sparkles',
    },
    {
        step: 3,
        title: 'Apply & Track',
        description: 'Submit your application and track its progress until disbursement.',
        icon: 'CheckCircle',
    },
];

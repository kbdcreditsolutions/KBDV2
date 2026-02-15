"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer, Section } from '@/components/layout'; // Assumes Section is exported
import { Card, CardContent, Button, Input, Select, Progress, Badge } from '@/components/ui'; // Assumes generic components
import { ArrowLeft, ArrowRight, CheckCircle, Wallet, Building, MapPin, CreditCard, Target, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

// Animation variants
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

export default function EstimatorPage() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const totalSteps = 5;

    const [formData, setFormData] = useState({
        income: '',
        employment: '',
        city: '',
        creditScore: '',
        purpose: '',
    });

    const handleNext = () => {
        if (step < totalSteps) {
            setDirection(1);
            setStep(step + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const updateForm = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    // Step components
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wallet className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">What's your monthly income?</h2>
                            <p className="text-gray-500 mt-2">This helps us calculate your eligibility.</p>
                        </div>
                        <div className="max-w-md mx-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                            <Input
                                type="number"
                                placeholder="e.g. 50000"
                                value={formData.income}
                                onChange={(e) => updateForm('income', e.target.value)}
                                className="text-lg py-6"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Employment Type</h2>
                            <p className="text-gray-500 mt-2">Banks offer different rates based on profession.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {['Salaried', 'Self-Employed', 'Business Owner', 'Student', 'Retired'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => updateForm('employment', type)}
                                    className={`p-6 border rounded-xl text-left transition-all ${formData.employment === type
                                            ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="font-semibold block">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Where do you live?</h2>
                            <p className="text-gray-500 mt-2">Location affects loan offers.</p>
                        </div>
                        <div className="max-w-md mx-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <select
                                className="w-full p-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.city}
                                onChange={(e) => updateForm('city', e.target.value)}
                            >
                                <option value="">Select City</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="delhi">Delhi</option>
                                <option value="bangalore">Bangalore</option>
                                <option value="hyderabad">Hyderabad</option>
                                <option value="chennai">Chennai</option>
                                <option value="pune">Pune</option>
                            </select>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Estimated Credit Score</h2>
                            <p className="text-gray-500 mt-2">It's okay if you don't know the exact number.</p>
                        </div>
                        <div className="space-y-3 max-w-md mx-auto">
                            {[
                                { label: 'Excellent (750+)', value: 'excellent' },
                                { label: 'Good (700-749)', value: 'good' },
                                { label: 'Average (650-699)', value: 'average' },
                                { label: 'Low (< 650)', value: 'low' },
                                { label: "Don't Know", value: 'unknown' }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => updateForm('creditScore', option.value)}
                                    className={`w-full p-4 border rounded-lg flex items-center justify-between transition-all ${formData.creditScore === option.value
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="font-medium">{option.label}</span>
                                    {formData.creditScore === option.value && <CheckCircle className="w-5 h-5 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Purpose of Loan</h2>
                            <p className="text-gray-500 mt-2">Help us find the right product for you.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {[
                                'Medical Emergency', 'Wedding', 'Home Renovation',
                                'Debt Consolidation', 'Travel', 'Education', 'Business', 'Other'
                            ].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => updateForm('purpose', p)}
                                    className={`p-4 border rounded-xl text-center transition-all ${formData.purpose === p
                                            ? 'border-blue-600 bg-blue-50 font-semibold'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isComplete) {
        return (
            <>
                <Navbar />
                <main className="pt-20 min-h-screen bg-gray-50 pb-20">
                    <div className="container-md pt-10">
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Great matches found!</h1>
                            <p className="text-lg text-gray-600">Based on your profile, here are the best offers for you.</p>
                        </div>

                        <div className="space-y-6 max-w-3xl mx-auto">
                            {/* Mock Result Card 1 */}
                            <Card className="overflow-hidden border-2 border-primary/20 bg-white">
                                <div className="bg-primary/5 p-4 border-b flex justify-between items-center">
                                    <span className="font-semibold text-primary flex items-center gap-2">
                                        <Badge variant="default" className="bg-primary">Best Match</Badge>
                                        HDFC Bank Personal Loan
                                    </span>
                                    <span className="text-sm text-gray-500">Fastest Approval</span>
                                </div>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                                            <p className="text-2xl font-bold text-accent">10.50%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Max Amount</p>
                                            <p className="text-xl font-semibold">₹40 Lakhs</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tenure</p>
                                            <p className="text-lg font-medium">Up to 5 Yrs</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">EMI Starting</p>
                                            <p className="text-lg font-medium">₹2,149/L</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button className="flex-1" size="lg">Apply Now</Button>
                                        <Button variant="outline" className="flex-1" size="lg">View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Mock Result Card 2 */}
                            <Card className="overflow-hidden bg-white">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">ICICI Bank Personal Loan</h3>
                                            <p className="text-sm text-gray-500">Pre-approved offers available</p>
                                        </div>
                                        <Badge variant="outline">Low Processing Fee</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                                            <p className="text-2xl font-bold text-gray-900">10.75%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Max Amount</p>
                                            <p className="text-xl font-semibold">₹35 Lakhs</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tenure</p>
                                            <p className="text-lg font-medium">Up to 6 Yrs</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">EMI Starting</p>
                                            <p className="text-lg font-medium">₹2,189/L</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="primary" className="flex-1">Apply Now</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="mt-12 text-center">
                            <Link href="/loans" className="text-primary hover:underline font-medium flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                View all loan offers
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="pt-20 min-h-screen bg-gray-50">
                <div className="container-md py-12">
                    {/* Progress Bar */}
                    <div className="mb-12 max-w-2xl mx-auto">
                        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                            <span>Step {step} of {totalSteps}</span>
                            <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
                        </div>
                        <Progress value={(step / totalSteps) * 100} className="h-2" />
                    </div>

                    {/* Step Content */}
                    <Card className="max-w-3xl mx-auto shadow-lg border-none">
                        <CardContent className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "tween", duration: 0.3 }}
                                    className="flex-1"
                                >
                                    {renderStep()}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-between items-center mt-12 pt-6 border-t">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className={step === 1 ? 'invisible' : ''}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>

                                <Button onClick={handleNext} variant="primary" size="lg" className="px-8">
                                    {step === totalSteps ? 'View Results' : 'Next'}
                                    {step !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
}

import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <div className="mb-6 rounded-full bg-blue-50 p-6">
                <Wrench className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Under Maintenance
            </h1>
            <p className="max-w-md text-gray-500">
                We&apos;re currently performing scheduled maintenance to improve our services.
                We&apos;ll be back shortly. Thank you for your patience.
            </p>
        </div>
    );
}

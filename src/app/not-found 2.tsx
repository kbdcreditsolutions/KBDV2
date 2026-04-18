import Link from 'next/link';
import { Button } from '@/components/ui';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
            <div className="mb-8 rounded-full bg-surface-100 p-6">
                <FileQuestion className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
                Page not found
            </h1>
            <p className="mb-8 max-w-md text-gray-500">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
            </p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="primary">Go Home</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="outline">Contact Support</Button>
                </Link>
            </div>
        </div>
    );
}

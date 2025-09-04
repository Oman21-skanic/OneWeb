import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl md:text-2xl font-semibold text-emerald-400">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-black shadow-sm border border-emerald-500 rounded-lg sm:rounded-xl md:rounded-2xl">
                        <div className="p-4 sm:p-6 text-white text-base md:text-lg">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

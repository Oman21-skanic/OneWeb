import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl md:text-2xl font-semibold text-emerald-400">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* Update Profile Information */}
                    <div className="bg-black shadow-sm
                                    rounded-lg sm:rounded-xl md:rounded-2xl
                                    p-4 sm:p-6 md:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {/* Update Password */}
                    <div className="bg-black shadow-sm
                                    rounded-lg sm:rounded-xl md:rounded-2xl
                                    p-4 sm:p-6 md:p-8">
                        <UpdatePasswordForm />
                    </div>

                    {/* Delete User */}
                    <div className="bg-black shadow-sm
                                    rounded-lg sm:rounded-xl md:rounded-2xl
                                    p-4 sm:p-6 md:p-8">
                        <DeleteUserForm />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

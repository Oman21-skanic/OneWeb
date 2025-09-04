import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
            <Head title="Forgot Password" />

            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-green-950 animate-gradient-x"></div>

            {/* Glowing circles */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-600/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-green-500/10 blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-green-400/20 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6 font-comfortaa bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Forgot Password
                </h2>

                <p className="text-sm text-gray-300 text-center mb-6">
                    No worries. Enter your email below and we’ll send you a reset link.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-500">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your email"
                            className="mt-2 block w-full border-0 border-b-2 border-green-400/40 bg-transparent text-white placeholder-gray-500 focus:border-green-500 focus:ring-0 transition-all"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-400" />
                    </div>

                    {/* Submit button */}
                    <div className="flex items-center justify-end">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 0px 15px rgba(34,197,94,0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            disabled={processing}
                            type="submit"
                            className="relative px-6 py-2.5 rounded-xl font-semibold text-white
                                [background:linear-gradient(#0a0a0a,#0a0a0a)_padding-box,
                                linear-gradient(to_right,#22c55e,#16a34a)_border-box]
                                border border-transparent transition-all duration-300"
                        >
                            Email Reset Link
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

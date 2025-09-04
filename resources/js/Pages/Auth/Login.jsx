import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
            <Head title="Log in" />

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
                <h2 className="text-4xl font-bold text-center mb-10 font-comfortaa bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Welcome Back
                </h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-500">{status}</div>
                )}

                <form onSubmit={submit} className="space-y-8">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-green-400" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your email"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-red-400" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-green-400" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-green-500 border-green-400/40 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-300">Remember me</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        )}

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
                            Log in
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

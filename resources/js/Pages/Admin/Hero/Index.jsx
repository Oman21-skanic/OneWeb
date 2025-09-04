import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function HeroIndex({ auth, heroes }) {
    const { data, setData, post, reset } = useForm({
        title: '',
        subtitle: '',
        status: 'draft',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.hero.store'), { onSuccess: () => reset() });
    };

    const handleUpdate = (id, values) => {
        router.put(route('admin.hero.update', id), values);
    };

    const handleDelete = (id) => {
        if (confirm('Yakin hapus?')) {
            router.delete(route('admin.hero.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-lg md:text-xl font-semibold text-emerald-400">
                    Hero Admin
                </h2>
            }
        >
            <Head title="Hero Manager" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
                    {/* Box utama abu-abu */}
                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-xl p-6 md:p-8">
                        {/* Form tambah hero */}
                        <form onSubmit={handleSubmit} className="mb-10 space-y-3">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
                                Add New Hero
                            </h2>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Subtitle"
                                className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={() => setData('status', 'draft')}
                                className="border border-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto"
                            >
                                Save (Draft)
                            </button>
                        </form>

                        {/* List heroes */}
                        <div className="grid gap-4">
                            {heroes.map((hero) => (
                                <div
                                    key={hero.id}
                                    className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 md:p-6 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 break-words">
                                            {hero.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 break-words">
                                            {hero.subtitle}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 sm:mt-0 text-xs md:text-sm px-2 py-1 rounded ${
                                                hero.status === 'published'
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-gray-500 text-white'
                                            }`}
                                        >
                                            {hero.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                handleUpdate(hero.id, {
                                                    ...hero,
                                                    status:
                                                        hero.status === 'draft'
                                                            ? 'published'
                                                            : 'draft',
                                                })
                                            }
                                            className={`px-3 py-1 rounded text-sm transition border w-full sm:w-auto ${
                                                hero.status === 'draft'
                                                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white'
                                                    : 'border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-600 hover:text-white'
                                            }`}
                                        >
                                            {hero.status === 'draft'
                                                ? 'Publish'
                                                : 'Unpublish'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hero.id)}
                                            className="border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded text-sm transition w-full sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

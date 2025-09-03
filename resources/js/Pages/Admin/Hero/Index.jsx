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
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Hero Manager
                </h2>
            }
        >
            <Head title="Hero Manager" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-black via-gray-900 to-green-900 text-gray-100 rounded-xl shadow-xl p-8">
                        {/* Form tambah hero */}
                        <form onSubmit={handleSubmit} className="mb-10">
                            <h2 className="text-xl mb-4 font-semibold text-green-300">
                                Add New Hero
                            </h2>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-2 rounded bg-gray-800 text-white mb-3"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Subtitle"
                                className="w-full p-2 rounded bg-gray-800 text-white mb-3"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={() => setData('status', 'draft')}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                            >
                                Save (Draft)
                            </button>
                        </form>

                        {/* List heroes */}
                        <div className="grid gap-4">
                            {heroes.map((hero) => (
                                <div
                                    key={hero.id}
                                    className="bg-gray-800 rounded-lg p-6 shadow-md flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">{hero.title}</h3>
                                        <p className="text-gray-400">{hero.subtitle}</p>
                                        <span
                                            className={`text-sm px-2 py-1 rounded ${hero.status === 'published'
                                                ? 'bg-green-600'
                                                : 'bg-gray-600'
                                                }`}
                                        >
                                            {hero.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
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
                                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                        >
                                            {hero.status === 'draft' ? 'Publish' : 'Unpublish'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hero.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
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

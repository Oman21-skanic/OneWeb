import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

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
                <div className="mx-auto max-w-7xl sm:px-4 lg:px-8 space-y-6">
                    {/* Box utama hitam dengan border hijau */}
                    <div className="bg-black text-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
                        {/* Form tambah hero */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-lg md:text-xl font-semibold text-emerald-400">
                                Add New Hero
                            </h2>

                            {/* Input Title */}
                            <TextInput
                                type="text"
                                placeholder="Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400"
                            />

                            {/* Input Subtitle */}
                            <TextInput
                                type="text"
                                placeholder="Subtitle"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400"
                            />

                            <button
                                type="submit"
                                onClick={() => setData('status', 'draft')}
                                className="px-4 py-2 rounded bg-emerald-800 text-white hover:bg-emerald-600 hover:text-white transition w-full sm:w-auto"
                            >
                                Save (Draft)
                            </button>
                        </form>

                        {/* List heroes */}
                        <div className="space-y-4">
                            {heroes.map((hero) => (
                                <div
                                    key={hero.id}
                                    className="bg-emerald-800 rounded-lg p-4 md:p-6 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                                >
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-base md:text-lg font-bold text-white break-words">
                                            {hero.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-white/70 break-words">
                                            {hero.subtitle}
                                        </p>
                                        <span className="inline-block mt-2 sm:mt-0 text-xs md:text-sm px-2 py-1 rounded bg-gray-800 text-white">
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
                                            className="px-3 py-1 rounded text-sm bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white w-full sm:w-auto"
                                        >
                                            {hero.status === 'draft'
                                                ? 'Publish'
                                                : 'Unpublish'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hero.id)}
                                            className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600 hover:text-white w-full sm:w-auto"
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

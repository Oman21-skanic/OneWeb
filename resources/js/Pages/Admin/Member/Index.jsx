import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function MemberIndex({ auth, members }) {
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, reset } = useForm({
        name: '',
        role: '',
        img_url: null,
        medsos: { instagram: '', linkedin: '', github: '' },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            router.post(route('admin.member.update', editingId), { ...data, _method: 'PUT' }, {
                onSuccess: () => { reset(); setEditingId(null); }
            });
        } else {
            post(route('admin.member.store'), { onSuccess: () => reset() });
        }
    };

    const handleEdit = (m) => {
        setEditingId(m.id);
        setData({
            name: m.name,
            role: m.role,
            img_url: null,
            medsos: m.medsos || { instagram: '', linkedin: '', github: '' },
        });
    };

    const handleCancel = () => {
        reset();
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus member ini?')) {
            router.delete(route('admin.member.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-lg md:text-xl font-semibold text-emerald-400">Member Manager</h2>}
        >
            <Head title="Member Manager" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl sm:px-4 lg:px-8 space-y-6">
                    {/* Box utama */}
                    <div className="bg-black text-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-lg font-semibold text-emerald-400">
                                {editingId ? 'Edit Member' : 'Add New Member'}
                            </h3>

                            <input type="text" placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full p-2 bg-black border-b-2 border-emerald-500 focus:border-emerald-400 focus:outline-none"
                            />
                            <input type="text" placeholder="Role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full p-2 bg-black border-b-2 border-emerald-500 focus:border-emerald-400 focus:outline-none"
                            />
                            <input type="file"
                                onChange={(e) => setData('img_url', e.target.files[0])}
                                className="w-full text-sm"
                            />
                            <input type="text" placeholder="Instagram"
                                value={data.medsos.instagram}
                                onChange={(e) => setData('medsos', { ...data.medsos, instagram: e.target.value })}
                                className="w-full p-2 bg-black border-b-2 border-emerald-500 focus:border-emerald-400 focus:outline-none"
                            />
                            <input type="text" placeholder="LinkedIn"
                                value={data.medsos.linkedin}
                                onChange={(e) => setData('medsos', { ...data.medsos, linkedin: e.target.value })}
                                className="w-full p-2 bg-black border-b-2 border-emerald-500 focus:border-emerald-400 focus:outline-none"
                            />
                            <input type="text" placeholder="GitHub"
                                value={data.medsos.github}
                                onChange={(e) => setData('medsos', { ...data.medsos, github: e.target.value })}
                                className="w-full p-2 bg-black border-b-2 border-emerald-500 focus:border-emerald-400 focus:outline-none"
                            />

                            <div className="flex gap-2">
                                <button type="submit"
                                    className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-600 w-full sm:w-auto"
                                >
                                    {editingId ? 'Update' : 'Add'}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={handleCancel}
                                        className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* List */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {members.map((m) => (
                                <div key={m.id} className="bg-emerald-900 rounded-lg p-4 flex flex-col items-center">
                                    <img src={`${m.img_url}`} alt={m.name}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <h4 className="mt-2 text-lg font-semibold">{m.name}</h4>
                                    <p className="text-sm text-gray-300">{m.role}</p>
                                    <div className="flex gap-2 mt-2 text-sm">
                                        {m.medsos?.instagram && <a href={m.medsos.instagram}>IG</a>}
                                        {m.medsos?.linkedin && <a href={m.medsos.linkedin}>LinkedIn</a>}
                                        {m.medsos?.github && <a href={m.medsos.github}>GitHub</a>}
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button onClick={() => handleEdit(m)}
                                            className="px-3 py-1 bg-yellow-500 rounded text-white">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(m.id)}
                                            className="px-3 py-1 bg-red-600 rounded text-white">
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

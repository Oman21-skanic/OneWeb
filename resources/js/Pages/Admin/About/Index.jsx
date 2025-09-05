import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';

const DEFAULT_IMG = '/assets/images/4.png';
const DEFAULT_SOCIALS = {
  ig: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/',
  github: 'https://github.com/',
};


export default function AboutIndex({ auth, team: initialTeam }) {
  const [team, setTeam] = useState(initialTeam);
  const [editingMember, setEditingMember] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [editPreviewImg, setEditPreviewImg] = useState(null);
  const { props } = usePage();
//   const [team, setTeam] = useState(initialTeam);

  const { data, setData, post, reset } = useForm({
    name: '',
    role: '',
    img_url: null,
    socials: { ...DEFAULT_SOCIALS },
  });


  // Tambahkan member baru dari flash data
  useEffect(() => {
    if (props.new_member) {
      setTeam([...team, props.new_member]);
    }
  }, [props.new_member]);

  // Tambah anggota
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name || 'No Name');
    formData.append('role', data.role || 'No Role');
    if (data.img_url) formData.append('img_url', data.img_url);
formData.append('socials[ig]', data.socials.ig || '');
formData.append('socials[linkedin]', data.socials.linkedin || '');
formData.append('socials[github]', data.socials.github || '');


   post(route('admin.about.store'), formData, {
  onSuccess: () => {
    reset(); // reset form
    setPreviewImg(null); // reset preview
    router.reload(); // reload Inertia page agar list ter-update otomatis
  },
  onError: (errors) => console.log(errors),
});


  };

  // Edit anggota
  const handleEdit = (id) => {
    const member = team.find((m) => m.id === id);
    setEditingMember({
      ...member,
      socials: { ...DEFAULT_SOCIALS, ...member.socials },
    });
    setEditPreviewImg(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingMember) return;
    const formData = new FormData();
    formData.append('name', editingMember.name || 'No Name');
    formData.append('role', editingMember.role || 'No Role');
    if (editingMember.img_url instanceof File) formData.append('img_url', editingMember.img_url);
    formData.append('socials[ig]', editingMember.socials.ig || DEFAULT_SOCIALS.ig);
    formData.append('socials[linkedin]', editingMember.socials.linkedin || DEFAULT_SOCIALS.linkedin);
    formData.append('socials[github]', editingMember.socials.github || DEFAULT_SOCIALS.github);

    router.put(route('admin.about.update', editingMember.id), formData, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        setTeam((prev) =>
          prev.map((m) => (m.id === editingMember.id ? { ...m, ...editingMember } : m))
        );
        setEditingMember(null);
        setEditPreviewImg(null);
      },
      onError: (errors) => console.log(errors),
    });
  };

  // Delete anggota
  const handleDelete = (id) => {
    if (confirm('Yakin hapus anggota ini?')) {
      router.delete(route('admin.about.destroy', id), {
        onSuccess: () => setTeam((prev) => prev.filter((m) => m.id !== id)),
      });
    }
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-lg md:text-xl font-semibold text-emerald-400">About Admin</h2>}>
      <Head title="About Manager" />

      <div className="py-6 md:py-12">
        <div className="mx-auto max-w-7xl sm:px-4 lg:px-8 space-y-6">
          <div className="bg-black text-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            {/* Form Tambah */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-emerald-400">Add New Team Member</h2>
              <TextInput type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <TextInput type="text" placeholder="Role" value={data.role} onChange={(e) => setData('role', e.target.value)} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <input type="file" onChange={(e) => {
                setData('img_url', e.target.files[0] || null);
                if (e.target.files[0]) setPreviewImg(URL.createObjectURL(e.target.files[0]));
                else setPreviewImg(null);
              }} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <TextInput type="text" placeholder="Instagram URL" value={data.socials.ig} onChange={(e) => setData('socials', { ...data.socials, ig: e.target.value })} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <TextInput type="text" placeholder="LinkedIn URL" value={data.socials.linkedin} onChange={(e) => setData('socials', { ...data.socials, linkedin: e.target.value })} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <TextInput type="text" placeholder="GitHub URL" value={data.socials.github} onChange={(e) => setData('socials', { ...data.socials, github: e.target.value })} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
              <button type="submit" className="px-4 py-2 rounded bg-emerald-800 text-white hover:bg-emerald-600 hover:text-white transition w-full sm:w-auto">Add Member</button>
            </form>

            {/* Preview */}
            {(data.name || data.role || previewImg) && (
              <div className="bg-emerald-700 rounded-lg p-4 md:p-6 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <div className="flex-1 space-y-1 flex items-center gap-4">
                  <img src={previewImg || DEFAULT_IMG} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white break-words">{data.name || 'No Name'}</h3>
                    <p className="text-sm md:text-base text-white/70 break-words">{data.role || 'No Role'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Edit */}
            {editingMember && (
              <form onSubmit={handleUpdate} className="space-y-4 mt-6">
                <h2 className="text-lg md:text-xl font-semibold text-emerald-400">Edit Member</h2>
                <TextInput type="text" placeholder="Name" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <TextInput type="text" placeholder="Role" value={editingMember.role} onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <input type="file" onChange={(e) => {
                  setEditingMember({ ...editingMember, img_url: e.target.files[0] });
                  if (e.target.files[0]) setEditPreviewImg(URL.createObjectURL(e.target.files[0]));
                  else setEditPreviewImg(null);
                }} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <TextInput type="text" placeholder="Instagram URL" value={editingMember.socials.ig} onChange={(e) => setEditingMember({ ...editingMember, socials: { ...editingMember.socials, ig: e.target.value }})} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <TextInput type="text" placeholder="LinkedIn URL" value={editingMember.socials.linkedin} onChange={(e) => setEditingMember({ ...editingMember, socials: { ...editingMember.socials, linkedin: e.target.value }})} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <TextInput type="text" placeholder="GitHub URL" value={editingMember.socials.github} onChange={(e) => setEditingMember({ ...editingMember, socials: { ...editingMember.socials, github: e.target.value }})} className="w-full p-2 bg-black text-white border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-400" />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 rounded bg-emerald-800 text-white hover:bg-emerald-600 transition">Update Member</button>
                  <button type="button" onClick={() => setEditingMember(null)} className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                </div>
                {(editPreviewImg || editingMember.img_url) && (
                  <div className="mt-2">
                    <h4 className="text-sm text-white/70 mb-1">Preview:</h4>
                    <img src={editPreviewImg || editingMember.img_url || DEFAULT_IMG} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                  </div>
                )}
              </form>
            )}

            {/* List anggota */}
            <div className="space-y-4 mt-6">
              {team.map((member) => (
                <div key={member.id} className="bg-emerald-800 rounded-lg p-4 md:p-6 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex-1 space-y-1 flex items-center gap-4">
                    <img src={member.img_url || DEFAULT_IMG} alt={member.name || 'No Name'} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white break-words">{member.name || 'No Name'}</h3>
                      <p className="text-sm md:text-base text-white/70 break-words">{member.role || 'No Role'}</p>
                      <div className="flex gap-2 mt-1">
                        <a href={member.socials?.ig || DEFAULT_SOCIALS.ig} target="_blank" className="text-pink-500 hover:text-pink-400 text-sm">IG</a>
                        <a href={member.socials?.linkedin || DEFAULT_SOCIALS.linkedin} target="_blank" className="text-blue-500 hover:text-blue-400 text-sm">LinkedIn</a>
                        <a href={member.socials?.github || DEFAULT_SOCIALS.github} target="_blank" className="text-gray-200 hover:text-white text-sm">GitHub</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => handleEdit(member.id)} className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto">Delete</button>
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

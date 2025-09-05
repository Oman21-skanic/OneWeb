<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    // Tampilkan semua anggota tim
    public function index()
    {
        $team = TeamMember::all();
        return Inertia::render('Admin/About/Index', compact('team'));
    }

    // Form tambah anggota (bisa pakai modal atau halaman terpisah)
    public function create()
    {
        return Inertia::render('Admin/About/Create');
    }

    // Simpan anggota baru
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'role' => 'required|string|max:255',
        'img_url' => 'nullable|image|max:2048',
        'socials.ig' => 'nullable|url',
        'socials.linkedin' => 'nullable|url',
        'socials.github' => 'nullable|url',
    ]);

    if ($request->hasFile('img_url')) {
        $path = $request->file('img_url')->store('team', 'public');
        $validated['img_url'] = '/storage/' . $path;
    } else {
        $validated['img_url'] = '/images/default-profile.png';
    }

    $member = TeamMember::create($validated);

    // Redirect dengan flash data member baru
    return redirect()->route('admin.about.index')->with('new_member', $member);
}



    // Tampilkan detail anggota
    public function show(TeamMember $about)
    {
        return Inertia::render('Admin/About/Show', compact('about'));
    }

    // Form edit anggota
    public function edit(TeamMember $about)
    {
        return Inertia::render('Admin/About/Edit', compact('about'));
    }

    // Update anggota
    public function update(Request $request, TeamMember $about)
{
    $validated = $request->validate([
    'name' => 'required|string|max:255',
    'role' => 'required|string|max:255',
    'img_url' => 'nullable|image',
'socials.ig' => 'nullable|url',
'socials.linkedin' => 'nullable|url',
'socials.github' => 'nullable|url',

]);

    if ($request->hasFile('img_url')) {
        $path = $request->file('img_url')->store('team', 'public');
        $validated['img_url'] = '/storage/' . $path;
    }

    $about->update($validated);

    return redirect()->route('admin.about.index')->with('success', 'Team member updated!');
}


    // Hapus anggota
    public function destroy(TeamMember $about)
    {
        $about->delete();
        return redirect()->route('admin.about.index')->with('success', 'Team member deleted!');
    }
}

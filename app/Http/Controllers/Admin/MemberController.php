<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Member/Index', [
            'members' => Member::all(),
        ]);
    }

    public function about()
    {
        return Inertia::render('About', [
            'team' => \App\Models\Member::all()
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'img_url' => 'nullable|image|max:2048', // max 2MB
            'medsos' => 'nullable|array',
            'medsos.*' => 'nullable|string|max:255',
        ]);

        // simpan foto
        if ($request->hasFile('img_url')) {
            $data['img_url'] = $request->file('img_url')->store('members', 'public');
        }

        Member::create($data);

        return redirect()->route('admin.member.index')->with('success', 'Member created!');
    }

    public function update(Request $request, Member $member)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'img_url' => 'nullable|image|max:2048',
            'medsos' => 'nullable|array',
            'medsos.*' => 'nullable|string|max:255',
        ]);

        // kalau ada foto baru, hapus lama lalu upload baru
        if ($request->hasFile('img_url')) {
            if ($member->img_url) {
                Storage::disk('public')->delete($member->img_url);
            }
            $path = $request->file('img_url')->store('members', 'public');
            $data['img_url'] = $path;
        }

        $member->update($data);

        return redirect()->route('admin.member.index')->with('success', 'Member updated!');
    }

    public function destroy(Member $member)
    {
        if ($member->img_url) {
            Storage::disk('public')->delete($member->img_url);
        }
        $member->delete();

        return back()->with('success', 'Member deleted!');
    }
}

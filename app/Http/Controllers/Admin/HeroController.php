<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hero;
use Inertia\Inertia;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('Admin/Hero/Index', [
            'heroes' => Hero::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Hero/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
        ]);

        // Kalau status "published", set semua hero lain jadi draft
        if ($data['status'] === 'published') {
            Hero::where('status', 'published')->update(['status' => 'draft']);
        }

        Hero::create($data);

        return redirect()->route('admin.hero.index')->with('success', 'Hero created!');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hero $hero)
    {
        return Inertia::render('Admin/Hero/Edit', [
            'hero' => $hero,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hero $hero)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
        ]);

        // Kalau update jadi published, set semua hero lain jadi draft
        if ($data['status'] === 'published') {
            Hero::where('status', 'published')
                ->where('id', '!=', $hero->id)
                ->update(['status' => 'draft']);
        }

        $hero->update($data);

        return redirect()->route('admin.hero.index')->with('success', 'Hero updated!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hero $hero)
    {
        $hero->delete();

        return back();
    }
}

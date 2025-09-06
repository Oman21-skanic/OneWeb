<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('About', [
            'members' => Member::all(),  // ambil semua member
        ]);
    }
}

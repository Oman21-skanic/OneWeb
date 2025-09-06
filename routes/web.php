<?php

// use App\Http\Controllers\Admin\AboutController;

use App\Http\Controllers\AboutController as ControllersAboutController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\ProfileController;
use App\Models\Hero;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    $heroes = Hero::where('status', 'published')->get();
    return Inertia::render('Home', [
        'heroes' => $heroes,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/font', function () {
    return Inertia::render('Font');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    Route::resource('hero', HeroController::class);
    Route::resource('member', MemberController::class);
    // Route::get('/about', [\App\Http\Controllers\Admin\MemberController::class, 'about'])->name('about');
});
Route::get('/about', [ControllersAboutController::class, 'index'])->name('about.index');

// ✅ Fallback route untuk halaman yang tidak ditemukan
Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';

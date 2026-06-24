<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactSubmissionController;
use App\Models\Article;
use App\Models\Chapter;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public facing routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'recentArticles' => Article::orderBy('created_at', 'desc')->take(3)->get(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About', [
        'chapters' => Chapter::all()
    ]);
})->name('about');

Route::get('/articles', [ArticleController::class, 'publicIndex'])->name('public.articles.index');
Route::get('/articles/{slug}', [ArticleController::class, 'publicShow'])->name('public.articles.show');

Route::get('/projects', [ProjectController::class, 'publicIndex'])->name('public.projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'publicShow'])->name('public.projects.show');

Route::get('/batch', [MemberController::class, 'publicIndex'])->name('public.members.index');
Route::get('/gallery', [GalleryController::class, 'publicIndex'])->name('public.gallery.index');

// Protected admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('chapters', ChapterController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('articles', ArticleController::class);
    Route::resource('members', MemberController::class);
    Route::resource('gallery', GalleryController::class)->only(['index', 'store', 'destroy']);
    Route::resource('submissions', ContactSubmissionController::class)->only(['index', 'update', 'destroy']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Project;
use App\Models\Article;
use App\Models\Member;
use App\Models\GalleryImage;
use App\Models\ContactSubmission;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $metrics = [
            'chapters' => Chapter::count(),
            'projects' => Project::count(),
            'articles' => Article::count(),
            'members' => Member::count(),
            'gallery' => GalleryImage::count(),
            'unreadSubmissions' => ContactSubmission::where('status', 'pending')->count(),
        ];

        $recentSubmissions = ContactSubmission::orderBy('created_at', 'desc')->take(5)->get();
        $recentProjects = Project::orderBy('created_at', 'desc')->take(3)->get();
        $recentArticles = Article::orderBy('created_at', 'desc')->take(3)->get();

        return Inertia::render('Dashboard', [
            'metrics' => $metrics,
            'recentSubmissions' => $recentSubmissions,
            'recentProjects' => $recentProjects,
            'recentArticles' => $recentArticles,
        ]);
    }
}

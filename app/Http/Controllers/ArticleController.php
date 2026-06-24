<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ArticleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Articles/Index', [
            'articles' => Article::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Articles/Form', [
            'isEdit' => false,
            'article' => null
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'desc_id' => 'required|string',
            'desc_en' => 'required|string',
            'content_id' => 'required|string',
            'content_en' => 'required|string',
            'thumbnail' => 'required|image|max:2048',
            'author' => 'required|string|max:255',
        ]);

        $thumbnailPath = $request->file('thumbnail')->store('articles', 'public');
        $thumbnailUrl = Storage::url($thumbnailPath);

        Article::create([
            'title_id' => $validated['title_id'],
            'title_en' => $validated['title_en'],
            'slug' => Str::slug($validated['title_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'content_id' => $validated['content_id'],
            'content_en' => $validated['content_en'],
            'thumbnail' => $thumbnailUrl,
            'author' => $validated['author'],
        ]);

        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('Articles/Form', [
            'isEdit' => true,
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'desc_id' => 'required|string',
            'desc_en' => 'required|string',
            'content_id' => 'required|string',
            'content_en' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'author' => 'required|string|max:255',
        ]);

        $updateData = [
            'title_id' => $validated['title_id'],
            'title_en' => $validated['title_en'],
            'slug' => Str::slug($validated['title_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'content_id' => $validated['content_id'],
            'content_en' => $validated['content_en'],
            'author' => $validated['author'],
        ];

        if ($request->hasFile('thumbnail')) {
            if ($article->thumbnail) {
                $oldPath = str_replace('/storage/', '', $article->thumbnail);
                Storage::disk('public')->delete($oldPath);
            }

            $thumbnailPath = $request->file('thumbnail')->store('articles', 'public');
            $updateData['thumbnail'] = Storage::url($thumbnailPath);
        }

        $article->update($updateData);

        return redirect()->route('articles.index')->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        if ($article->thumbnail) {
            $oldPath = str_replace('/storage/', '', $article->thumbnail);
            Storage::disk('public')->delete($oldPath);
        }

        $article->delete();

        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
    }

    public function publicIndex(): Response
    {
        return Inertia::render('Articles/PublicIndex', [
            'articles' => Article::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function publicShow(string $slug): Response
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        return Inertia::render('Articles/PublicShow', [
            'article' => $article,
            'recentArticles' => Article::orderBy('created_at', 'desc')->take(3)->get()
        ]);
    }
}

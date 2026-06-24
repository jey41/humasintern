<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Gallery/Index', [
            'images' => GalleryImage::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'image|max:3072', // max 3MB per file
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('gallery', 'public');
                $url = Storage::url($path);

                GalleryImage::create([
                    'url' => $url,
                    'title' => $request->input('title') ?: $file->getClientOriginalName(),
                    'caption' => $request->input('caption'),
                ]);
            }
        }

        return redirect()->route('gallery.index')->with('success', 'Images uploaded successfully.');
    }

    public function destroy(GalleryImage $gallery): RedirectResponse
    {
        if ($gallery->url) {
            $oldPath = str_replace('/storage/', '', $gallery->url);
            Storage::disk('public')->delete($oldPath);
        }

        $gallery->delete();

        return redirect()->route('gallery.index')->with('success', 'Image deleted successfully.');
    }

    public function publicIndex(): Response
    {
        return Inertia::render('Gallery/PublicIndex', [
            'images' => GalleryImage::orderBy('created_at', 'desc')->get()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ChapterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Chapters/Index', [
            'chapters' => Chapter::orderBy('name_id', 'asc')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Chapters/Form', [
            'isEdit' => false,
            'chapter' => null
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name_id' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'desc_id' => 'required|string',
            'desc_en' => 'required|string',
            'division' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'photo' => 'required|image|max:2048', // max 2MB
        ]);

        $photoPath = $request->file('photo')->store('chapters', 'public');
        $photoUrl = Storage::url($photoPath);

        Chapter::create([
            'name_id' => $validated['name_id'],
            'name_en' => $validated['name_en'],
            'slug' => Str::slug($validated['name_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'division' => $validated['division'],
            'location' => $validated['location'],
            'photo' => $photoUrl,
        ]);

        return redirect()->route('chapters.index')->with('success', 'Chapter created successfully.');
    }

    public function edit(Chapter $chapter): Response
    {
        return Inertia::render('Chapters/Form', [
            'isEdit' => true,
            'chapter' => $chapter
        ]);
    }

    public function update(Request $request, Chapter $chapter): RedirectResponse
    {
        $validated = $request->validate([
            'name_id' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'desc_id' => 'required|string',
            'desc_en' => 'required|string',
            'division' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $updateData = [
            'name_id' => $validated['name_id'],
            'name_en' => $validated['name_en'],
            'slug' => Str::slug($validated['name_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'division' => $validated['division'],
            'location' => $validated['location'],
        ];

        if ($request->hasFile('photo')) {
            // Delete old photo if exists locally
            if ($chapter->photo) {
                $oldPath = str_replace('/storage/', '', $chapter->photo);
                Storage::disk('public')->delete($oldPath);
            }

            $photoPath = $request->file('photo')->store('chapters', 'public');
            $updateData['photo'] = Storage::url($photoPath);
        }

        $chapter->update($updateData);

        return redirect()->route('chapters.index')->with('success', 'Chapter updated successfully.');
    }

    public function destroy(Chapter $chapter): RedirectResponse
    {
        if ($chapter->photo) {
            $oldPath = str_replace('/storage/', '', $chapter->photo);
            Storage::disk('public')->delete($oldPath);
        }

        $chapter->delete();

        return redirect()->route('chapters.index')->with('success', 'Chapter deleted successfully.');
    }
}

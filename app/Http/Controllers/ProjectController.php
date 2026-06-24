<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderBy('start_date', 'desc')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Form', [
            'isEdit' => false,
            'project' => null
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
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' => 'required|string|max:255',
            'partner' => 'required|string|max:255',
        ]);

        $thumbnailPath = $request->file('thumbnail')->store('projects', 'public');
        $thumbnailUrl = Storage::url($thumbnailPath);

        Project::create([
            'title_id' => $validated['title_id'],
            'title_en' => $validated['title_en'],
            'slug' => Str::slug($validated['title_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'content_id' => $validated['content_id'],
            'content_en' => $validated['content_en'],
            'thumbnail' => $thumbnailUrl,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'location' => $validated['location'],
            'partner' => $validated['partner'],
        ]);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Form', [
            'isEdit' => true,
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'desc_id' => 'required|string',
            'desc_en' => 'required|string',
            'content_id' => 'required|string',
            'content_en' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' => 'required|string|max:255',
            'partner' => 'required|string|max:255',
        ]);

        $updateData = [
            'title_id' => $validated['title_id'],
            'title_en' => $validated['title_en'],
            'slug' => Str::slug($validated['title_en']),
            'desc_id' => $validated['desc_id'],
            'desc_en' => $validated['desc_en'],
            'content_id' => $validated['content_id'],
            'content_en' => $validated['content_en'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'location' => $validated['location'],
            'partner' => $validated['partner'],
        ];

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                $oldPath = str_replace('/storage/', '', $project->thumbnail);
                Storage::disk('public')->delete($oldPath);
            }

            $thumbnailPath = $request->file('thumbnail')->store('projects', 'public');
            $updateData['thumbnail'] = Storage::url($thumbnailPath);
        }

        $project->update($updateData);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->thumbnail) {
            $oldPath = str_replace('/storage/', '', $project->thumbnail);
            Storage::disk('public')->delete($oldPath);
        }

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    public function publicIndex(): Response
    {
        return Inertia::render('Projects/PublicIndex', [
            'projects' => Project::orderBy('start_date', 'desc')->get()
        ]);
    }

    public function publicShow(string $slug): Response
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        return Inertia::render('Projects/PublicShow', [
            'project' => $project
        ]);
    }
}

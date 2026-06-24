<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Members/Index', [
            'members' => Member::with('chapter')->orderBy('name', 'asc')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Members/Form', [
            'isEdit' => false,
            'member' => null,
            'chapters' => Chapter::orderBy('name_id', 'asc')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'photo' => 'required|image|max:2048',
            'email' => 'nullable|email|max:255',
            'instagram' => 'nullable|string|max:255',
            'chapter_id' => 'nullable|exists:chapters,id',
        ]);

        $photoPath = $request->file('photo')->store('members', 'public');
        $photoUrl = Storage::url($photoPath);

        Member::create([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'division' => $validated['division'],
            'photo' => $photoUrl,
            'email' => $validated['email'],
            'instagram' => $validated['instagram'],
            'chapter_id' => $validated['chapter_id'],
        ]);

        return redirect()->route('members.index')->with('success', 'Member created successfully.');
    }

    public function edit(Member $member): Response
    {
        return Inertia::render('Members/Form', [
            'isEdit' => true,
            'member' => $member,
            'chapters' => Chapter::orderBy('name_id', 'asc')->get()
        ]);
    }

    public function update(Request $request, Member $member): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'email' => 'nullable|email|max:255',
            'instagram' => 'nullable|string|max:255',
            'chapter_id' => 'nullable|exists:chapters,id',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'role' => $validated['role'],
            'division' => $validated['division'],
            'email' => $validated['email'],
            'instagram' => $validated['instagram'],
            'chapter_id' => $validated['chapter_id'],
        ];

        if ($request->hasFile('photo')) {
            if ($member->photo) {
                $oldPath = str_replace('/storage/', '', $member->photo);
                Storage::disk('public')->delete($oldPath);
            }

            $photoPath = $request->file('photo')->store('members', 'public');
            $updateData['photo'] = Storage::url($photoPath);
        }

        $member->update($updateData);

        return redirect()->route('members.index')->with('success', 'Member updated successfully.');
    }

    public function destroy(Member $member): RedirectResponse
    {
        if ($member->photo) {
            $oldPath = str_replace('/storage/', '', $member->photo);
            Storage::disk('public')->delete($oldPath);
        }

        $member->delete();

        return redirect()->route('members.index')->with('success', 'Member deleted successfully.');
    }

    public function publicIndex(): Response
    {
        return Inertia::render('Members/PublicIndex', [
            'members' => Member::with('chapter')->orderBy('name', 'asc')->get(),
            'batches' => Chapter::orderBy('name_id', 'asc')->get()
        ]);
    }
}

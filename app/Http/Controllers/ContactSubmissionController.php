<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ContactSubmissionController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $query = ContactSubmission::query();
        if ($status) {
            $query->where('status', $status);
        }

        return Inertia::render('ContactSubmissions/Index', [
            'submissions' => $query->orderBy('created_at', 'desc')->get(),
            'currentFilter' => $status ?: 'all'
        ]);
    }

    public function update(Request $request, ContactSubmission $contactSubmission): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,read,replied'
        ]);

        $contactSubmission->update([
            'status' => $validated['status']
        ]);

        return redirect()->route('submissions.index')->with('success', 'Submission status updated.');
    }

    public function destroy(ContactSubmission $contactSubmission): RedirectResponse
    {
        $contactSubmission->delete();

        return redirect()->route('submissions.index')->with('success', 'Submission deleted.');
    }
}

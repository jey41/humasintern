<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'division',
        'photo',
        'email',
        'instagram',
        'chapter_id',
    ];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}

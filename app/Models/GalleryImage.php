<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'media_url',
        'media_type',
        'media_source',
        'thumbnail',
        'title',
        'caption',
    ];
}

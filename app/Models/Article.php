<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_id',
        'title_en',
        'slug',
        'desc_id',
        'desc_en',
        'content_id',
        'content_en',
        'thumbnail',
        'author',
    ];
}

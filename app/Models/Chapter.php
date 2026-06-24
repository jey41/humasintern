<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_id',
        'name_en',
        'slug',
        'desc_id',
        'desc_en',
        'division',
        'location',
        'photo',
    ];

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}

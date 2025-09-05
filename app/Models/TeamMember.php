<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    // Tambahkan ini:
    protected $fillable = [
        'name',
        'role',
        'img_url',
        'socials', // jika ini json di DB
    ];

    // Jika kolom socials bertipe JSON, bisa juga pakai casting:
    protected $casts = [
        'socials' => 'array',
    ];
}

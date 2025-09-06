<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Member extends Model
{
    protected $fillable = ['name', 'role', 'img_url', 'medsos'];

    protected $casts = [
        'medsos' => 'array',
    ];

    // Jika img_url di DB adalah path (members/xxx.jpg) => ubah jadi full URL.
    // Jika sudah external url (http...), kembalikan apa adanya.
    public function getImgUrlAttribute($value)
    {
        if (!$value) return null;

        if (Str::startsWith($value, ['http://', 'https://'])) {
            return $value; // external URL
        }

        return Storage::url($value); // e.g. /storage/members/abc.jpg or full URL depending disk config
    }
}

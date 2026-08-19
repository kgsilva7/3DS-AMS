<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'avatar',
        'phone',
        'address',
        'birth_date',
    ];

    /**
     * Relacionamento inverso 1:1 - Profile pertence a User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

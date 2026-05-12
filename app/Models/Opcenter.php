<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Opcenter extends Model
{
    protected $fillable = ['name', 'legacy_group_id',];

    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}

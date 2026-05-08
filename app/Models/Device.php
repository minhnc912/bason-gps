<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['unit_id', 'serial', 'opcenter_id', 'status'];

    protected $with = ['state'];

    public function opcenter()
    {
        return $this->belongsTo(Opcenter::class);
    }

    public function state()
    {
        return $this->hasOne(DeviceState::class);
    }

    public function histories()
    {
        return $this->hasMany(DeviceHistory::class);
    }
}

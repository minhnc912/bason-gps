<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'opcenter_id',
        'device_id',
        'created_by',
        'unit_id',
        'truck_number',
        'meter_number',
        'address',
        'latitude',
        'longitude',
        'action',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function opcenter()
    {
        return $this->belongsTo(Opcenter::class);
    }
}

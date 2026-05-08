<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceHistory extends Model
{
    protected $fillable = ['device_id', 'latitude', 'longitude', 'power_status', 'temperature', 'tool_watch', 'address', 'started_at', 'ended_at', 'duration_seconds'];

    protected $casts = [
        'power_status' => 'boolean',

        'started_at' => 'datetime',

        'ended_at' => 'datetime',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}

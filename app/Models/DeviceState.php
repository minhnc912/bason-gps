<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceState extends Model
{
    protected $fillable = ['device_id', 'latitude', 'longitude', 'power_status', 'temperature', 'tool_watch', 'firmware_version', 'address', 'session_started_at', 'last_report_at'];

    protected $casts = [
        'power_status' => 'boolean',

        'session_started_at' => 'datetime',

        'last_report_at' => 'datetime',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}

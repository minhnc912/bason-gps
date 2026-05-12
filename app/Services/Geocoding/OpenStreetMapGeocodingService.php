<?php

namespace App\Services\Geocoding;

use Illuminate\Support\Facades\Http;

class OpenStreetMapGeocodingService
{
    public function reverseGeocode(
        float $latitude,
        float $longitude
    ): ?string {

        $response = Http::withHeaders([
            'User-Agent' => 'BacSonGPS/1.0',
        ])->get(
            'https://nominatim.openstreetmap.org/reverse',
            [
                'lat' => $latitude,
                'lon' => $longitude,
                'format' => 'jsonv2',
            ]
        );

        if (!$response->successful()) {
            return null;
        }

        return $response->json('display_name');
    }
}

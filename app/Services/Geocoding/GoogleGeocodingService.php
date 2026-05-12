<?php

namespace App\Services\Geocoding;

use Illuminate\Support\Facades\Http;

class GoogleGeocodingService
{
    public function reverseGeocode(float $latitude, float $longitude): ?string
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'latlng' => "{$latitude},{$longitude}",
            'key' => config('services.google_maps.api_key'),
        ]);
        if (!$response->successful()) {
            return null;
        }

        $results = $response->json('results');

        if (empty($results)) {
            return null;
        }

        return $results[0]['formatted_address'] ?? null;
    }
}

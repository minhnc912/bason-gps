<?php

namespace App\Actions\Realtime;

use App\Services\Geocoding\GoogleGeocodingService;
use App\Services\Geocoding\OpenStreetMapGeocodingService;

class ResolveAddressAction
{
    public static function run(?float $latitude, ?float $longitude): ?string
    {
        if (!$latitude || !$longitude) {
            return null;
        }

        // return app(GoogleGeocodingService::class)->reverseGeocode($latitude, $longitude);
        return app(OpenStreetMapGeocodingService::class)->reverseGeocode($latitude, $longitude);
    }
}

<?php

namespace App\Enums;

enum GpsTrackingEnum:int
{
    case MIN_DISTANCE_METERS = 20;

    case ADDRESS_UPDATE_DISTANCE_METERS = 50;

    case HISTORY_INTERVAL_MINUTES = 30;
}

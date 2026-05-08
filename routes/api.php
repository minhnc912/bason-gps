<?php

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\DeviceIngestController;
use App\Http\Controllers\Api\OpcenterController;
use App\Http\Controllers\DeviceHistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/devices', [DeviceController::class, 'index']);
    Route::get('/devices/{device}/histories', [DeviceHistoryController::class, 'index']);
    Route::middleware('role:' . UserRoleEnum::SUPERUSER->value)->group(function () {
        Route::post('/devices', [DeviceController::class, 'store']);
        Route::put('/devices/{device}', [DeviceController::class, 'update']);
        Route::delete('/devices/{device}', [DeviceController::class, 'destroy']);

        Route::post('/device-ingest', [DeviceIngestController::class, 'store']);
    });
});

Route::get('/opcenters', [OpcenterController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    // Opcenter

    Route::post('/opcenters', [OpcenterController::class, 'store'])->middleware('role:' . UserRoleEnum::SUPERUSER->value);

    Route::post('/opcenters/assign-user', [OpcenterController::class, 'assignUser'])->middleware('role:' . UserRoleEnum::SUPERUSER->value);
});

<?php

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\DeviceIngestController;
use App\Http\Controllers\Api\OpcenterController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DeviceHistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/opcenters/options', [OpcenterController::class, 'options']);

// Authenticated Routes

Route::middleware('auth:sanctum')->group(function () {
    // Auth

    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/user', fn(Request $request) => $request->user());

    Route::middleware('role:' . UserRoleEnum::SUPERUSER->value)->group(function () {
        Route::get('/users', [UserController::class, 'index']);

        Route::put('/users/{user}/role', [UserController::class, 'updateRole']);

        Route::get('/opcenters', [OpcenterController::class, 'index']);
        Route::post('/opcenters', [OpcenterController::class, 'store']);

        Route::put('/opcenters/{opcenter}', [OpcenterController::class, 'update']);

        Route::delete('/opcenters/{opcenter}', [OpcenterController::class, 'destroy']);
    });

    // Devices

    Route::get('/devices', [DeviceController::class, 'index']);

    Route::get('/devices/{device}/histories', [DeviceHistoryController::class, 'index']);

    // Superuser Routes

    Route::middleware('role:' . UserRoleEnum::SUPERUSER->value)->group(function () {
        // Devices CRUD

        Route::post('/devices', [DeviceController::class, 'store']);

        Route::put('/devices/{device}', [DeviceController::class, 'update']);

        Route::delete('/devices/{device}', [DeviceController::class, 'destroy']);

        // Device Ingest

        Route::post('/device-ingest', [DeviceIngestController::class, 'store']);

        // Opcenters

        Route::post('/opcenters', [OpcenterController::class, 'store']);
    });
});

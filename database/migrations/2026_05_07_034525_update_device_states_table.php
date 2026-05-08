<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('device_states', function (Blueprint $table) {

            $table->boolean('power_status')
                ->default(false);

            $table->float('temperature')
                ->nullable();

            $table->string('tool_watch')
                ->nullable();

            $table->string('firmware_version')
                ->nullable();

            $table->text('address')
                ->nullable();

            $table->timestamp('session_started_at')
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('device_states', function (Blueprint $table) {

            $table->dropColumn([
                'power_status',
                'temperature',
                'tool_watch',
                'firmware_version',
                'address',
                'session_started_at',
            ]);
        });
    }
};

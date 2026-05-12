<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('opcenters', function (Blueprint $table) {
            $table->integer('legacy_group_id')->nullable()->unique();
        });
        Schema::table('devices', function (Blueprint $table) {
            $table->integer('legacy_device_id')->nullable()->unique();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('legacy_user_id')->nullable()->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

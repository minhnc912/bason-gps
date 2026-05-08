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
        Schema::create('device_histories', function (Blueprint $table) {
            $table->id();

            $table->foreignId('device_id')->constrained()->cascadeOnDelete();

            $table->decimal('latitude', 10, 7);

            $table->decimal('longitude', 10, 7);

            $table->boolean('power_status');

            $table->float('temperature')->nullable();

            $table->string('tool_watch')->nullable();

            $table->text('address')->nullable();

            $table->timestamp('started_at');

            $table->timestamp('ended_at');

            $table->integer('duration_seconds')->default(0);

            $table->string('operator')->nullable();

            $table->string('firmware_version')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device_histories');
    }
};

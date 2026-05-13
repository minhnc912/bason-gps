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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('opcenter_id')->constrained()->cascadeOnDelete();

            $table->foreignId('device_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();

            $table->string('unit_id');

            $table->string('truck_number')->nullable();

            $table->string('meter_number')->nullable();

            $table->text('address')->nullable();

            $table->decimal('latitude', 10, 7)->nullable();

            $table->decimal('longitude', 10, 7)->nullable();

            $table->string('action');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};

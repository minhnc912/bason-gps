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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();

            $table->string('unit_id')->unique();
            $table->string('serial')->nullable();

            $table->foreignId('opcenter_id')->constrained()->cascadeOnDelete();

            $table->tinyInteger('status')->default(1);

            $table->timestamps();

            $table->index('opcenter_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};

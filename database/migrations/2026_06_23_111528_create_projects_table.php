<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title_id');
            $table->string('title_en');
            $table->string('slug')->unique();
            $table->text('desc_id');
            $table->text('desc_en');
            $table->longText('content_id');
            $table->longText('content_en');
            $table->string('thumbnail');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('location');
            $table->string('partner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

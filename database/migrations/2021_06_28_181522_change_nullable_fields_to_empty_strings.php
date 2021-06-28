<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNullableFieldsToEmptyStrings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('url')->nullable(false)->default('')->change();
            $table->string('public_img_path')->nullable(false)->default('')->change();
            $table->string('description')->nullable(false)->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('url')->nullable(true)->change();
            $table->string('public_img_path')->nullable(true)->change();
            $table->string('description')->nullable(true)->change();
        });
    }
}

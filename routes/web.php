<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix'=> 'admin/'], function() {
    Auth::routes();

    Route::get('/', function () {
        return view('welcome');
    });


    Route::group(['middleware' => ['auth']], function () {
        Route::view('/{path?}', 'adminapp');
        Route::group(['prefix'=> 'api/v1/'], function() {
            Route::resource('items', ItemController::class);
        });
    });
});


Route::any('{any}', function () {return view('app');})->where('any', '.*');


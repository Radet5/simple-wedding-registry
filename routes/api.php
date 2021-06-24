<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'v1/'], function () {
    Route::apiResource('items', ItemController::class);
    Route::resource('purchases', PurchaseController::class);
    Route::resource('reservations', ReservationController::class);

    Route::group(['middleware' => ['sse']], function () {
        Route::get('sse-items', [ItemController::class, 'sseIndex']);
    });
});
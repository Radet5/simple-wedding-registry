<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::group(['prefix' => 'items/'], function() {
        Route::get('/index', function() {
            $items = [
                [
                    'id' => 0,
                    'name' => 'A nice Fork',
                    'url' => 'www.forks.com',
                    'price' => 24,
                ],
                [
                    'id' => 1,
                    'name' => 'Dang a plate?',
                    'url' => 'www.bigplateMamas.com',
                    'price' => 200,
                ],
            ];
            return response()->json(['items'=>$items]);
        });
    });
});
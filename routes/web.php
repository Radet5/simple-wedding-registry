<?php

use Illuminate\Support\Facades\Route;

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
        Route::get('/index', function () {
            return response('Hi admin');
        });
    });
});


Route::view('/{path?}', 'app');


<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MessageController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/register', [AuthController::class, 'register'])->name('api.auth.register');
Route::post('auth/login', [AuthController::class, 'login'])->name('api.auth.login');
Route::get('auth/me', [AuthController::class, 'me'])
    ->name('api.auth.me')
    ->middleware('auth:api');

Route::post('message/send', [MessageController::class, 'send'])
    ->name('api.message.send')
    ->middleware('auth:api');

Route::post('message/sendDM', [MessageController::class, 'sendDM'])
    ->name('api.message.sendDM')
    ->middleware('auth:api');


<?php

use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
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

Route::get('/get_tasks', [TaskController::class, 'getTasks']);
Route::get('/get_task/{task}', [TaskController::class, 'getTask']);
Route::put('/done_task/{task}', [TaskController::class, 'doneTask']);
Route::post('/add_task', [TaskController::class, 'addTask']);
Route::put('/edit_task/{task}', [TaskController::class, 'editTask']);
Route::delete('/delete_task/{task}', [TaskController::class, 'deleteTask']);

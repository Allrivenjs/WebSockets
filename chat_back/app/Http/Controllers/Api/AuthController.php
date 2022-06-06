<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required|email',
            'password'=>[Password::default(), 'required']
        ]);
        $user = new User([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        $token = $user->createToken('authToken')->accessToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>['required']
        ]);
        $data = $request->only('email', 'password');
        if (! Auth::attempt($data)){
            return response([
                'message' => 'Error de credenciales',
            ])->setStatusCode(Response::HTTP_FORBIDDEN);
        }

        $token = Auth::user()->createToken('authToken')->accessToken;

        return response([
            'user' => Auth::user(),
            'token' => $token,
        ]);
    }

    public function me(){
        return response([
            'user' => Auth::user(),
        ]);
    }
}

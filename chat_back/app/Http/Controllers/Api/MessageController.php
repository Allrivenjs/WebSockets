<?php

namespace App\Http\Controllers\Api;

use App\Events\ChatEvent;
use App\Events\DirectMessageEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request){
        $request->validate([
            'message' => 'required|string',
//            'receiver_id' => 'required|integer',
        ]);
        broadcast(new ChatEvent($request->message))->toOthers();
        return response(null);
    }

    public function sendDM(Request $request){
        $request->validate([
          'message' => 'required|string',
          'to' => 'required',
        ]);
        $data = $request->only(['message', 'to']);
        event(new DirectMessageEvent($data));
        return response(null);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Item;
use App\Mail\ItemReserved;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $success = false;
        Validator::make($request->all(), [
            'itemId' => ['required'],
            'firstName' => ['required'],
            'lastName' => ['required'],
            'email' => ['required', 'email'],
        ], [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
        ])->validate();

        try{
            $reservation = new Reservation();
            $reservation->first_name = $request['firstName'];
            $reservation->last_name = $request['lastName'];
            $reservation->email = $request['email'];
            $reservation->item_id = $request['itemId'];
            $reservation->save();
            $success = true;
            Redis::del('items');
            if ($reservation->email && !APP::environment('local')) {
                Log::info("Trying to email: ".$reservation->name."\n at: ".$reservation->email);
                Mail::to($reservation->email)->send( new ItemReserved(Item::find($reservation->item_id), $reservation));
            }
        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success'=>$success, 'received'=>$request, 'reservation'=>$reservation]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $items = Item::whereHas('reservation', function ($query) use ($email) {
            $query->where('email', $email);
        })->with('reservation')->get();
        return response()->json(['items' => $items]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        Redis::del('items');
        return response()->json(['success'=>true]);
    }
}

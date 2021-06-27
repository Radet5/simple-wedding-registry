<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Item;
use App\Mail\ItemRegistered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;

class PurchaseController extends Controller
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
            'address' => ['required'],
        ], [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'address.required' => 'We need your address so we can send a thank you!',
        ])->validate();

        try{
            $purchase = new Purchase();
            $purchase->first_name = $request['firstName'];
            $purchase->last_name = $request['lastName'];
            $purchase->email = $request['email'];
            $purchase->store_name = $request['storeName'];
            $purchase->order_number = $request['orderNumber'];
            $purchase->msg = $request['msg'];
            $purchase->item_id = $request['itemId'];
            $purchase->save();
            $success = true;
            Redis::del('items');
            if ($purchase->email && !APP::environment('local')) {
                Log::info("Trying to email: ".$purchase->name."\n at: ".$purchase->email);
                Mail::to($purchase->email)->send( new ItemRegistered(Item::find($purchase->item_id)));
            }
        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success'=>$success, 'received'=>$request, 'purchase'=>$purchase]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function show(Purchase $purchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function edit(Purchase $purchase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchase $purchase)
    {
        //
    }
}

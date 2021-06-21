<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redis;

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
        ], [
            'firstName.required' => 'The rest of the fields are optional, but we do need a name at least',
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

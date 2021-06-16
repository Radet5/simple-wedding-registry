<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\ImageManagerStatic as Image;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::all();
        return response()->json(['items'=>$items]);
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
        try{
            //need to install GD for the resizing stuff
            $tmpPath = $request->file('image')->store('tmp_images');
            $item = new Item();
            $item->name = $request['name'];
            $item->price = $request['price'];
            $item->url = $request['url'];
            $item->description = $request['description'];
            $item->img_filename = $tmpPath;
            $item->save();
            Image::make(Storage::get($tmpPath))
                ->resize(200, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->save(storage_path('/app/public/item_images/item-'.$item->id.'.jpg'));
            Storage::delete($tmpPath);
            $item->img_filename = Storage::url('item_images/item-'.$item->id.'.jpg');
            $item->save();
//          $path = $request->file('image')->store('public');
            $success = true;
        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success'=>$success, 'received'=>$request, 'item'=>$item]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return response()->json(['success'=>true]);
    }
}

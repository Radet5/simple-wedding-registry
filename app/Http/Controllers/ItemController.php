<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Str;

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
        $cachedItems = Redis::get('items');

        if (isset($cachedItems)) {
            $items = json_decode($cachedItems, false);
            return response()->json(['items'=>$items, 'redis'=>true]);
        }
        $items = Item::with('purchase')->get();
        Redis::set('items', $items);
        Redis::set('items_timestamp', time());
        return response()->json(['items'=>$items, 'redis'=>false]);
    }

    public function sseIndex()
    {
        $response = new StreamedResponse(function() {
            $cacheId = Str::uuid()->toString();
            $interval = 200000;//us
            $ttl = 60;//seconds
            $currentCache = true;
            while($currentCache) {
                $cachedItems = Redis::get('items');
                $cachedItemsTimestamp = Redis::get('items_timestamp');
                if (isset($cachedItems)) {
                    $currentCacheTimestamp = Redis::get('items_ses_'.$cacheId);
                    if ($currentCacheTimestamp != $cachedItemsTimestamp) {
                        Redis::set('items_ses_'.$cacheId, $cachedItemsTimestamp, 'EX', $ttl);
                        $items = json_decode($cachedItems, false);
                        echo 'data: ' . json_encode($items) ."\n\n";
                    }
                    ob_flush();
                    flush();
                    usleep($interval);
                }
                else {
                    $items = Item::with(['purchase', 'reservation'])->get();
                    Redis::set('items', $items);
                    Redis::set('items_timestamp', time());
                    echo 'data: ' . json_encode($items) . "\n\n";
                    ob_flush();
                    flush();
                    usleep($interval);
                }
                $currentCache = Redis::get('items_ses_'.$cacheId);
            }
        });
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('X-Accel-Buffering', 'no');
        $response->headers->set('Cach-Control', 'no-cache');
        return $response;
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
            $item = new Item();
            $item->name = $request['name'];
            $item->price = $request['price'];
            $item->url = $request['url'];
            $item->description = $request['description'];
            $item->save();
            Redis::del('items');
            if ($request->file('image')) {
                $tmpPath = $request->file('image')->store('tmp_images');
                Image::make(Storage::get($tmpPath))
                    ->resize(200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    })
                    ->save(storage_path('/app/public/item_images/item-'.$item->id.'.jpg'));
                Storage::delete($tmpPath);
                $item->public_img_path = Storage::url('item_images/item-'.$item->id.'.jpg');
                $item->save();
            }
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
        Redis::del('items');
        return response()->json(['success'=>true]);
    }
}

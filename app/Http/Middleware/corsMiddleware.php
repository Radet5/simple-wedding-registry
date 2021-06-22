<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class corsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Access-Control-Allow-Origin' , '*');
        $response->headers->set('Access-Control-Allow-Methods', '*');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Signature, X-Requested-With, Application','ip');
        

        return $response;
    }
}

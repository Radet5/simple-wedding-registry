<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\Reservation;
use App\Models\Item;
use App\Mail\ItemReservationExpired;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        //delete expired reservations and notify the user who reserved it
        $schedule->call(function () {
            $expiredReservations = Reservation::where('created_at', '<=', Carbon::now()->subWeeks(1)->toDateTimeString())->get();
            foreach ($expiredReservations as $reservation) {
                Mail::to($reservation->email)->send( new ItemReservationExpired(Item::find($reservation->item_id), $reservation));
                $reservation->delete();
            }
            Redis::del('items');
        })->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

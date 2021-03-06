<?php

namespace App\Mail;

use App\Models\Item;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ItemReserved extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The Item registered
     * 
     * @var \App\Models\Item
     */
    public $item;
    public $reservation;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Item $item, $reservation)
    {
        $this->item = $item;
        $this->reservation = $reservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.itemReserved');
    }
}

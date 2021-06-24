<p>Hi!</P>
<p>We have reserved the following gift in the registry:</p>

{{ $item->name }}

<p>This item will be reserved in our registry for one week.</p>
<p>If you purchase the item in that time period please
return to this site and let us know that you have bought
it either by using the link below or by
clicking the button on the site and entering
the email address at which you recieved this message.</p>
<p>Please note that this does not mean the item is reserved
at any store; just that it will not appear on our registry
list during the time which is it still marked as reserved.</p>

<a href="{{ url('reservation/'.$email) }}">I bought it!</a>

<p>Missy & Radet</p>
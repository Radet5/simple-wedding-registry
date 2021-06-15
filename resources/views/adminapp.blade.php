<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<! — csrf token →
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>Your Website Title</title>
<! — styles →
<link href="{{ asset('css/adminapp.css') }}" rel="stylesheet">
</head>
<body>
<div id="react-adminapp"></div>
<script src="{{ asset('js/adminapp.js') }}"></script>
</body>
</html>
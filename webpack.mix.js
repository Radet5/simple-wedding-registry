const mix = require('laravel-mix');
require('dotenv').config()
let webpack = require('webpack')

let dotenvplugin = new webpack.DefinePlugin({
    'process.env': {
        APP_ENV: JSON.stringify(process.env.APP_ENV || 'App environment'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//mix.js('resources/js/app.js', 'public/js')
//    .react()
//    .sass('resources/sass/app.scss', 'public/css');

mix.ts("resources/js/app.js", "public/js")
    .ts("resources/js/adminapp.js", "public/js")
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        plugins: [
            dotenvplugin
        ]
    });

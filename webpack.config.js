// @AngularClass

var webpack = require('webpack');
var helpers = require('./helpers');

var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var autoprefixer = require('autoprefixer');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'Task assignment',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};
/*
 * Config
 */
module.exports = helpers.validate({
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: helpers.root('dist')
  },

  resolve: {
    extensions: ['', '.ts', '.async.ts', '.js', '.json', '.css', '.scss', '.html']
  },

  module: {
    preLoaders: [
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs') ] }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
            
      // Font awesome
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      
      // Auth0     
      {  test: /node_modules\/auth0-lock\/.*\.js$/,  loaders: [ 'transform-loader/cacheable?brfs', 'transform-loader/cacheable?packageify' ]},
      
      {  test: /node_modules\/auth0-lock\/.*\.ejs$/,  loader: 'transform-loader/cacheable?ejsify'}
    ]
  },
  postcss: [ autoprefixer ],
  
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      "Tether": 'tether',
      "window.Tether": "tether"
    })
  ],

  // Other module loader config

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
});

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

require('es6-promise').polyfill();

module.exports = {
  entry: './js/app.js',

  output: {
    path: __dirname,
    filename: './js/main.js'
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin('/css/main.css'),
    // new UglifyJsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options: { presets: ['es2015'] }
       },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader?limit: 8192&name=img/[name].[hash].[ext]',
          }
        ]
      },{
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=font/[name].[hash].[ext]',
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              minimize: false
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
        })
      }
    ]
  },

  stats: {
    colors: true
  },
  devtool: 'source-map'
};

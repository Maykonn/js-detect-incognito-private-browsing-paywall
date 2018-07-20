const CompressionPlugin = require("compression-webpack-plugin");
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

/**
 * Webpack configuration
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: [
          '$', 'webpackJsonp'
        ],
        screw_ie8: true
      },
      //sourceMap: true,
      beautify: false,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      },
      output: {
        comments: false,
      },
      comments: false,
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: "BrowsingModeDetector.gz",
      threshold: 0
    })
  ]
});

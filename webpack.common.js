const webpack = require('webpack');
const path = require('path');
require("es6-shim");

/**
 * Webpack configuration
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */

module.exports = {
  entry: {
    'BrowsingModeDetector': ['es6-shim', './BrowsingModeDetector.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: "js-detect-incognito-private-browsing",
    libraryTarget: "umd",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  'targets': {
                    'browsers': ['>= 1%', 'IE >= 9'],
                  },
                },
              ],
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    })
  ]
}

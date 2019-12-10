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
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: "BrowsingModeDetector.gz",
      threshold: 0
    })
  ]
});

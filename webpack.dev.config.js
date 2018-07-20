const merge = require('webpack-merge');
const common = require('./webpack.common');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');


/**
 * Webpack configuration
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    //new BundleAnalyzerPlugin()
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, "/"),
      path.join(__dirname, "/dist"),
    ],
    overlay: true,
    host: "localhost"
  },
  watch: true
});

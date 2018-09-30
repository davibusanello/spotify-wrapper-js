const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const nodeENV = process.env.NODE_ENV || 'production';

module.exports = {
  mode: nodeENV,
  devtool: 'source-map',
  entry: {
    filename: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.build.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['@babel/preset-env', {
            modules: false,
          }],
        ],
      },
    }],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeENV),
      },
    }),
  ],
};

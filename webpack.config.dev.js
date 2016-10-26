const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./webpack/env');

const PATHS = require('./webpack/paths');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'eval',
  entry: [
    'react-dev-utils/webpackHotDevClient',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './webpack/polyfills',
    PATHS.appIndex,
  ],
  output: {
    path: PATHS.build,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', ''],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: PATHS.app,
        loaders: ['babel'],
      },
      {
        test: /\.(scss|css)$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss?sourceMap',
          'resolve-url',
          'sass?sourceMap',
        ],
        include: [PATHS.app, PATHS.nodeModules],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  postcss: () => [autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9',
    ],
  })],
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: PATHS.html,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(PATHS.nodeModules),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

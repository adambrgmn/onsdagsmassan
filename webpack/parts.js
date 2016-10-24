import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import InlineManifestPlugin from 'inline-manifest-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import autoprefixer from 'autoprefixer';

import htmlOptions from './htmlOptions';

export const indexTemplate = ({ title, appMountId, template }) => ({
  plugins: [
    new HtmlPlugin({
      ...htmlOptions,
      title,
      appMountId,
      template,
    }),
  ],
});

export const loadJSX = (include) => ({
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel?cacheDirectory',
        include,
      },
    ],
  },
});

export const loadImagesBuild = (include) => ({
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        loaders: [
          'url?limit=25000&hash=sha512&digest=hex&context=./app/images&name=images/[path][name].[hash].[ext]', // eslint-disable-line max-len
          'image-webpack?bypassOnDebug?optimizationLevel=7&interlaced=false',
        ],
        include,
      },
    ],
  },
});

export const loadImagesDev = (include) => ({
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        loader: 'url?limit=25000&context=./app/images&name=images/[path][name].[ext]',
        include,
      },
    ],
  },
});

export const loadFavicon = (include) => ({
  module: {
    loaders: [
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]',
        include,
      },
    ],
  },
});

export const loadJSON = () => ({
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
});

export const devServer = ({ host, port, poll }) => ({
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
  ],
  watchOptions: poll ? {
    aggregateTimeout: 300,
    poll: 1000,
  } : undefined,
});

export const setupCSS = (include) => ({
  postcss: () => [autoprefixer],
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss?sourceMap',
          'resolve-url',
          'sass?sourceMap',
        ],
        include,
      },
    ],
  },
});

export const extractCss = (include) => ({
  postcss: () => [autoprefixer],
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!resolve-url!sass' // eslint-disable-line max-len
        ),
        include,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
});

export const minify = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
});

export const setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return { plugins: [new webpack.DefinePlugin(env)] };
};

export const extractBundle = ({ name, entries }) => {
  const entry = {};
  entry[name] = entries;

  return {
    entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [name, 'manifest'],
        minChunks: Infinity,
      }),
    ],
  };
};

export const setupProduction = () => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new InlineManifestPlugin({ name: 'webpackManifest' }),
  ],
});

export const clean = (path) => ({
  plugins: [
    new CleanPlugin([path], { root: process.cwd() }),
  ],
});

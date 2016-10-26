import path from 'path';
import url from 'url';
import merge from 'webpack-merge';
import validate from 'webpack-validator';

import packageJson from './package.json';
import * as parts from './webpack/parts';
import PATHS from './webpack/paths';

import build from './webpack.config.prod';
import dev from './webpack.config.dev';

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;

process.env.BABEL_ENV = TARGET;

const ensureSlash = (p, needsSlash) => {
  const hasSlash = p.endsWith('/');

  if (hasSlash && !needsSlash) {
    return p.substr(p, p.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${p}/`;
  }

  return p;
};

const homepagePath = packageJson.homepage;
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/';
const publicPath = ensureSlash(homepagePathname, true);
const publicUrl = ensureSlash(homepagePathname, false);

const common = merge(
  {
    entry: {
      app: [PATHS.polyfills, PATHS.app],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['', '.js', '.json', '.jsx'],
      alias: {
        'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator'),
      },
    },
  },
  parts.indexTemplate({
    title: 'onsdagsmassan',
    appMountId: 'root',
    template: PATHS.html,
  }),
  parts.loadJSX(PATHS.app),
  parts.loadFavicon(PATHS.favicon),
  parts.loadJSON(PATHS.app)
);

let config;

switch (TARGET) {
  case 'build':
  case 'build:stats':
    config = build;
    // config = merge(
    //   common,
    //   {
    //     devtool: 'source-map',
    //     output: {
    //       path: PATHS.build,
    //       filename: 'static/js/[name].[chunkhash].js',
    //       chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    //       publicPath,
    //     },
    //   },
    //   parts.loadImagesBuild(PATHS.app),
    //   parts.clean(PATHS.build),
    //   parts.setFreeVariable('process.env.NODE_ENV', 'production'),
    //   parts.minify(),
    //   parts.extractCss(PATHS.app),
    //   parts.extractBundle({
    //     name: 'vendor',
    //     entries: ['react', 'react-dom'],
    //   }),
    //   parts.setupProduction()
    // );

    break;

  default:
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      parts.setupCSS([PATHS.app, PATHS.nodeModules]),
      parts.loadImagesDev(PATHS.app),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING,
      })
    );
}

export default validate(config, { quiet: true });

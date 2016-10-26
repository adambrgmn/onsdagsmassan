/* eslint-disable prefer-template */
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const httpProxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const detect = require('detect-port');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const prompt = require('react-dev-utils/prompt');

const { proxy } = require('../package');
const config = require('./config/dev');
const PATHS = require('./config/paths');

if (!checkRequiredFiles([PATHS.appHtml, PATHS.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = process.env.PORT || 3000;
let compiler;
let handleCompile;

function setupCompiler(host, port, protocol) {
  compiler = webpack(config, handleCompile);

  compiler.plugin('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });

  compiler.plugin('done', (stats) => {
    clearConsole();

    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
      console.log();
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
    }
  });
}

function onProxyError(proxy) {
  return (err, req, res) => {
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    );
    console.log();

    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    );
  };
}

function addMiddleware(devServer) {
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ? ['text/html'] : ['text/html', '*/*'],
  }));

  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
      console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
      console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
      process.exit(1);
    }

    const mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;

    devServer.use(mayProxy,
      httpProxyMiddleware(pathname => mayProxy.test(pathname), {
        target: proxy,
        logLevel: 'silent',
        onError: onProxyError(proxy),
        secure: false,
        changeOrigin: true,
      })
    );
  }

  devServer.use(devServer.middleware);
}

function runDevServer(host, port, protocol) {
  const devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: PATHS.appPublic,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host,
  });

  addMiddleware(devServer);

  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    clearConsole();
    console.log(chalk.cyan('Starting the development server...'));
    return console.log();
  });
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  clearConsole();
  const question =
    chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.') +
    '\n\nWould you like to run the app on another port instead?';

  prompt(question, true).then(shouldChangePort => {
    if (shouldChangePort) {
      run(port);
    }
  });
});

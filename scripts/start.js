process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const detect = require('detect-port');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const prompt = require('react-dev-utils/prompt');

const config = require('../webpack.config.dev');
const PATHS = require('../webpack/paths');

const DEFAULT_PORT = process.env.PORT || 3000;
let compiler;
let handleCompile;

const setupCompiler = (host, port, protocol) => {
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
      console.log(chalk.cyan(`  ${protocol}://${host}:${port}/`));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
      console.log();
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });

      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiles with warnings.'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(message);
        console.log();
      });
    }
  });
};

const addMiddleware = (devServer) => {
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', '*/*'],
  }));

  devServer.use(devServer.middleware);
};

const runDevServer = (host, port, protocol) => {
  const devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: PATHS.public,
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
    if (err) return console.error(err);

    clearConsole();
    console.log(chalk.cyan('Starting development server...'));
    return console.log();
  });
};

const run = (port) => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
};

detect(DEFAULT_PORT).then((port) => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  clearConsole();
  const question = `${chalk.yellow(`Something is already running on port ${DEFAULT_PORT}.`)}\n\nWould you like to run the app on another port instead?`;

  prompt(question, true).then((shouldChangePort) => {
    if (shouldChangePort) run(port);
  });
});

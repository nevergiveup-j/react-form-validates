var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./scripts/webpack/webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  }
}).listen(3000, '127.0.0.1', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Listening at 127.0.0.1:3000');
});

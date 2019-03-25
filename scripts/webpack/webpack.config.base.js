const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    // new ExtractTextPlugin('index.css')
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: [
                    'last 2 versions',
                    'Firefox ESR',
                    '> 1%',
                    'ie >= 9',
                    'iOS >= 8',
                    'Android >= 4',
                  ],
                },
              }],
              'es2015',
              'react',
              'stage-0',
            ],
            plugins: [
              'transform-object-assign'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: [
                    'last 3 versions',
                    'ie >= 9',
                    'ie_mob >= 10',
                    'ff >= 30',
                    'chrome >= 34',
                    'safari >= 6',
                    'opera >= 12.1',
                    'ios >= 6',
                    'android >= 4.4',
                    'bb >= 10',
                    'and_uc 9.9',
                  ],
                }),
              ]
            },
          },
          {
            loader: 'sass-loader'
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],

      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    console: 'mock'
  }
};



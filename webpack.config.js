const path = require('path');
const webpack = require('webpack');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ROOT_PATH = path.resolve(__dirname);
// const APP_PATH = path.resolve(ROOT_PATH, 'src');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const generateEntry = require('./chore/generate_entry');

const isDev = require('./chore/isDev');
var _ = require('lodash');


let config = {
  context: path.resolve(__dirname, './src'),
  entry: generateEntry.getEntries(),
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, './dist'),
    filename: '[name]/index.js',
  },

  externals: [{
    'handlebars/runtime': {
      root: 'Handlebars',
      amd: 'handlebars.runtime',
      commonjs2: 'handlebars/runtime',
      commonjs: 'handlebars/runtime'
    },
    'handlebars': {
      root: 'Handlebars',
      amd: 'Handlebars',
      commonjs: 'handlebars',
      commonjs2: 'handlebars'
    }
  }],

  module: {
    rules: [
      // {
      //     test: /\.css$/,
      //     use: [ 'style-loader', 'css-loader' ]
      // },
      // {
      //     test: /\.(sass|scss)$/,
      //     use: [
      //         "style-loader",
      //         "css-loader",
      //         "postcss-loader",
      //         "sass-loader",
      //     ]
      // },
      {
        test: /\.(handlebars|hbs)$/,
        // loader: "handlebars-loader",
        loader: "handlebars-loader",
        options: {
          runtime: 'handlebars/dist/handlebars.runtime',
        }
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                //localIdentName: '[folder]__[local]__[hash:base64:5]',
                localIdentName: '[local]',
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: [NODE_MODULES],
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/index.css',
      allChunks: false
    })
  ],
};

if (isDev()) {
  _.assign(config, {
    devServer: {
      historyApiFallback: true,
      hot: true
    },
    devtool: 'eval-source-map'
  })
}

if (!isDev()) {
  // config.plugins.push(
  //     new UglifyJSPlugin({
  //       compress: {warnings: false}
  //     })
  // )
}

module.exports = config;
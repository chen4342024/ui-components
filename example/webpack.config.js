const path = require('path');
const webpack = require('webpack');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let entryUtil = require('./chore/generate_entry');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: entryUtil.getEntries(),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
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
          name: '../images/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: [NODE_MODULES],
        loader: 'babel-loader'
      },
    ]
  },
  plugins: entryUtil.getPlugins(),
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  devtool: 'eval-source-map'
};
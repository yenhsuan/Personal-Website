const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './js/main.js'),
  ],
  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, '/public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions:{
          output: {
            comments: false, // remove comments
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.html$/,
        include: path.join(__dirname, './template'),
        use: [ {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }]
      },
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, './template/index.html'),
      favicon: path.join(__dirname, './favicon.ico'),
      minify: {
        collapseWhitespace: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[hash].css",
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    contentBase: path.join(__dirname, './public'),
    overlay: {
      errors: true,
    },
    publicPath: '/',
    historyApiFallback: true,
  },
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    port: 8080,
    compress: true
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
        'postcss-loader']
        },
        {
           test: /\.(png|svg|jpg|jpeg|gif)$/,
           type: 'asset/resource',
           generator: {
               filename: 'images/[name].[hash][ext]',
           }
        },
        {
           test: /\.(woff|woff2|eot|ttf|otf)$/i,
           type: 'asset/resource',
           generator: {
               filename: 'fonts/[name].[hash][ext]',
           }
        },
        {
             test: /\.js$/,
             use: 'babel-loader',
             exclude: '/node_modules/'
           }
      ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html'
      })
  ]
};
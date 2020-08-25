/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = x => ({
  ...x,
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
});

const frontend = common({
  devtool: 'inline-source-map',
  node: {
    __dirname: false
  },
  entry: './src/frontend/view/App.tsx',
  mode: 'development',
  target: 'web', // change to web if web lol
  output: {
    path: path.resolve(__dirname, './dist/assets/'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    compress: false,
    port: 9000,
    publicPath: '/assets/'
  },
  plugins: [new HtmlWebpackPlugin({hash: true, filename: './../app/index.html'})]
});

module.exports = [frontend];

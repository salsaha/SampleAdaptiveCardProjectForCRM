const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const { prod_Path, src_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./" + src_Path + "/index.ts"
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: "[name].[chunkhash].js"
  },
  //devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: selectedPreprocessor.loaderName
          }
        ]
      }
    ]
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
      root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./" + src_Path + "/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([{
      from: 'node_modules/adaptivecards-designer/dist/containers/*',
      to: 'containers/',
      flatten: true
    }]),
    new MonacoWebpackPlugin({
      languages: ['json']
    })
  ]
};

/* eslint-env node */

const path = require("path");
const process = require("process");

const HtmlPlugin = require("html-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const CssPlugin = require("mini-css-extract-plugin");

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, "dist");

let isDev = process.env["BUILD_ENV"] !== "production";

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,

  context: srcDir,
  entry: "./js/index.js",

  devServer: {
    static: distDir,
  },

  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new EslintPlugin(),
    new CssPlugin({
      filename: "[contenthash].css",
    }),
  ],

  output: {
    filename: "[contenthash].js",
    path: distDir,
    // clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          // Рекомендуется использоавть `style-loader` вместо `mini-css` в dev среде, для hot-reload:
          // https://github.com/webpack-contrib/mini-css-extract-plugin/blob/8b52feeac2e9d0b539feb1ccd08eaffdf01d50f5/README.md#recommended
          isDev ? "style-loader" : CssPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
};

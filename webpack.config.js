const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    main: "./src/index.js"
  },

  output: {
    path: path.join(__dirname, "./dist"),

    publicPath: "/dist/",

    filename: "index.js"
  },

  devServer: {
    contentBase: "src",
    historyApiFallback: true,
    inline: true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + "/src/index.html",
        inject: 'body',
        minify: {
            removeComments: true
        }
    }),
  ]
};

module.exports = config;

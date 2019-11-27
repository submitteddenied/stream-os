const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const OUTPUT_DIR = path.resolve(__dirname, "dist")
module.exports = {
  entry: path.resolve("src/frontend/index.js"),
  output: {
    path: OUTPUT_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/index.html"),
      filename: path.resolve(OUTPUT_DIR, "./index.html")
    })
    // To add more HTML entry points, add more HtmlWebPackPlugin instances to this list
  ]
};

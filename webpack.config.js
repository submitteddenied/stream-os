const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const OUTPUT_DIR = path.resolve(__dirname, "dist", "frontend")
const frontend = {
  entry: {
    app: path.resolve("src/frontend/index.js"),
    boot: path.resolve("src/frontend/boot.js"),
    three: path.resolve("src/frontend/three.js")
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: '/'
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
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|glb)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        }
      }
    ]
  },
  devServer: {
    contentBase: OUTPUT_DIR,
    publicPath: '/',
    watchContentBase: true,
    liveReload: true,
    after: (app, server, compiler) => {
      app.use(require('./src/backend/app'))
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/index.html"),
      filename: path.resolve(OUTPUT_DIR, "./index.html"),
      chunks: ['app']
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/error.html"),
      filename: path.resolve(OUTPUT_DIR, "./error.html"),
      chunks: []
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/boot.html"),
      filename: path.resolve(OUTPUT_DIR, "./boot.html"),
      chunks: ['boot']
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/three.html"),
      filename: path.resolve(OUTPUT_DIR, "./three.html"),
      chunks: ['three']
    })
    // To add more HTML entry points, add more HtmlWebPackPlugin instances to this list
  ]
}

const backend = {
  entry: path.resolve("src/backend/app.js"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist", "backend")
  }
}

module.exports = [frontend, backend]

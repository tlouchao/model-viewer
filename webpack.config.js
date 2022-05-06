const dotenv = require("dotenv")
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
dotenv.config()

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
  path: path.join(__dirname, 'build'),
  filename: 'bundle.js'
},
devServer: {
  port: 3000
},
resolve: {
  extensions: ['.js', 'jsx', 'sass', 'scss']
},
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.s[ac]ss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.svg$/,
      exclude: /node_modules/,
      use: {
          loader: 'svg-inline-loader',
          options: {},
    },
  }
  ]
},
plugins: [
  new CopyWebpackPlugin({
    patterns: [
    { from: `${__dirname}/public`, to: 'public' }
    ]
  }),
  new HtmlWebpackPlugin({ 
    template: './src/index.html',
    inject: 'body'
  })
  ]
}
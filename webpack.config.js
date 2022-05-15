const dotenv = require("dotenv")
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
dotenv.config()

module.exports = (env, argv) => {
  console.log(argv.mode + '\n')
  const mode = argv.mode || 'development'
  const config = {
    mode: 'development',
    devtool: (mode === 'development') ? 'inline-source-map' : false,
    entry: "./src/index.js",
    output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
    },
    devServer: {
      port: 3000
    },
    resolve: {
      extensions: ['.js', 'jsx', 'sass', 'scss', '.svg', '.png']
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
          test: /\.png$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
        { from: `${__dirname}/public`, to: 'public' },
        { from: `${__dirname}/src/static/imgs`, to: 'public/assets' }
        ]
      }),
      new HtmlWebpackPlugin({ 
        template: './src/index.html',
        inject: 'body'
      })
      ]
    }
  return config
}
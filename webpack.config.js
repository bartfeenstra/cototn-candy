'use strict'

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const configuration = require('./webpack.config.json')

module.exports = {
  mode: configuration.debug ? 'development' : 'production',
  entry: {
    cotton_candy: path.resolve(__dirname, 'main.js')
  },
  output: {
    path: path.resolve(__dirname, 'webpack-build'),
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'www-dev'),
    },
  },
  optimization: {
    minimize: !configuration.debug,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'cotton_candy',
          // Group all CSS files into a single file.
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                indentWidth: 4,
                outputStyle: configuration.debug ? 'expanded' : 'compressed',
                sourceComments: configuration.debug
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  debug: configuration.debug,
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ],
            cacheDirectory: configuration.cacheDirectory
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          // outputPath: path.join('assets', 'fonts'),
          // publicPath: 'assets/fonts/',
          filename: '[name][ext]',
        }
      }
    ]
  }
}

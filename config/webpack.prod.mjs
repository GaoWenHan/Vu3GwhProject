import { merge } from 'webpack-merge'
import common from './webpack.common.mjs'
import Dotenv from 'dotenv-webpack'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import chalk from 'chalk'

const gradientColors = [
  '#FF0000',
  '#FF3300', '#FF6600', '#FF9900',
  '#FFCC00',
  '#99FF00', '#66FF00', '#33FF00',
  '#00FF00'
]

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                auto: true
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: 'js/[name].[contenthash].js'
        }
      }
    }
  },
  plugins: [
    new Dotenv({
      path: './.env.production'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css'
    }),
    new webpack.ProgressPlugin((percent, msg) => {
      const colorIndex = Math.min(
        gradientColors.length - 1,
        Math.floor(percent * gradientColors.length)
      )
      const color = gradientColors[colorIndex]
      const barLength = 30
      const filled = Math.round(percent * barLength)
      const bar = `[${'█'.repeat(filled)}${' '.repeat(barLength - filled)}]`
      process.stdout.write(chalk.hex(color)(`${bar} ${(percent * 100).toFixed(1)}% ${msg}\r`))
      if (percent === 1) {
        console.log('\n')
      }
    })
  ]
})

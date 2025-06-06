import { merge } from 'webpack-merge'
import common from './webpack.common.mjs'
import Dotenv from 'dotenv-webpack'

export default merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: (await import('sass')).default
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env.development'
    })
  ]
})

import { defineConfig } from 'webpack'
import { merge } from 'webpack-merge'
import commonConfig from './config/webpack.common.js'
import devConfig from './config/webpack.dev.js'
import prodConfig from './config/webpack.prod.js'

export default defineConfig((env, argv) => {
  const isProduction = argv.mode === 'production'
  return merge(commonConfig, isProduction ? prodConfig : devConfig)
})

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const DtsBundle = require('dts-bundle-webpack')

const config = {
  context: path.resolve(__dirname),
  target: 'web',
  stats: {
    children: false,
    entrypoints: false,
    modules: false
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js',
      '.ts',
      '.tsx',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      }
    ]
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
    config.output = {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'assets/[name].js'
    }
    config.devServer = {
      port: 5000,
      host: '0.0.0.0',
      hot: true,
      historyApiFallback: true,
      overlay: true,
      stats: {
        all: false,
        errors: true,
        timings: true,
        warnings: true
      }
    }
    config.optimization = {
      runtimeChunk: 'single'
    }
    config.entry = {
      home: './src/index'
    }
    config.plugins = [
      new HtmlWebpackPlugin({
        title: 'Circular slider preview'
      })
    ]
  }

  if (argv.mode === 'production') {
    config.devtool = 'source-map'
    config.output = {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      clean: true
    }
    config.externals = [nodeExternals()]
    config.optimization = {
      minimize: true,
      splitChunks: false,
      runtimeChunk: false
    }
    config.plugins = [
      new DtsBundle({
        name: 'fast-circular-slider',
        main: 'build/src/components/CircularSlider/index.d.ts',
        out: '../../../index.d.ts'
      })
    ]
    config.entry = {
      Windrose: [
        path.resolve(__dirname, '/src/components/CircularSlider')
      ]
    }
  }

  return config
}

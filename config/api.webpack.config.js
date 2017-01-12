'use strict' // eslint-disable-line strict

const path = require('path')
const webpack = require('webpack')
const log = require('debug')('app:config:webpack')
const nodeExternals = require('webpack-node-externals')

const appConfig = require('./app.config')
const pkg = require('../package.json')

const __PROD__ = process.env.NODE_ENV === 'production'
// const __DEV__ = process.env.NODE_ENV === 'development'

const vendor = [
  'apollo-client',
  'react',
  'react-apollo',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-thunk'
]

vendor.forEach((name) => {
  if (pkg.dependencies[name]) return true
  log(`Vendor "${name}" was not found in package.json. It will not be included in the bundle`)
})

const config = {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration.
  // `entry` and `module.rules.loader` options are resolved relative to this directory
  context: path.resolve(__dirname, './'),

  // The point or points to enter the application. At this point, the application starts executing.
  // If an array is passed, all items will be executed. Simple rule: one entry point per HTML page.
  // SPA: one entry point. MPA: multiple entry points https://webpack.js.org/configuration/entry-context
  entry: entry(),

  // Options related to how webpack emits results
  output: output(),

  // enhance debugging by adding meta info for the browser devtools: 'source-map' | 'eval'
  devtool: devtool(),

  // options for resolving module requests (does not apply to resolving to loaders)
  resolve: resolve(),

  plugins: plugins(),

  // The configuration regarding modules
  module: modules(),

  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules:  web | node | webworker etc...
  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  externals: nodeExternals(),

  name: 'api'
}

function entry() {
  let app = [path.resolve(appConfig.paths.api, './index')]
  return app
}

function output() {
  return {
    // the target directory for all output files must be an absolute path
    // path: path.join(__dirname, '/dist', '/assets'),
    path: path.join(appConfig.paths.dist, './api'),

    // the filename template for entry chunks: "bundle.js" "[name].js" "[chunkhash].js"
    filename: 'index.js',

    // the url to the output directory resolved relative to the HTML page
    publicPath: 'api/',
  }
}

function devtool() {
  return __PROD__ ? 'source-map' : 'eval-source-map'
}

function plugins() {
  log('Enable common plugins: Define, LoaderOptions, HtmlWebpack, CommonsChunk')
  const common = [
    // map variables
    new webpack.DefinePlugin(appConfig.globals),
  ]

  if (__PROD__) {
    log('Enable plugins for production: OccurrenceOrder, UglifyJs')
    return common.concat([
      // optimize order of modules based on how often it is used
      new webpack.optimize.OccurrenceOrderPlugin(),

      // uglify and minify javascript files
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    ])
  }
}

function resolve() {
  return {
    modules: [
      'node_modules',
      appConfig.paths.api
    ],
    extensions: ['.js', '.jsx', '.json']
  }
}

function modules() {
  return {
    rules: [
      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          appConfig.paths.api
        ],
        exclude: [
          /node_modules/,
        ],
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.woff(\?.*)?$/,
        use: [{ loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' }]
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: [{ loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' }]
      },
      {
        test: /\.otf(\?.*)?$/,
        use: [{ loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' }]
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: [{ loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' }]
      },
      {
        test: /\.eot(\?.*)?$/,
        use: [{ loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' }]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [{ loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' }]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader?limit=8192' }]
      }
    ],
  }
}

module.exports = config

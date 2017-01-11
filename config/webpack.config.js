'use strict' // eslint-disable-line strict

const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const log = require('debug')('app:config:webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const appConfig = require('./app.config')
const pkg = require('../package.json')

const __PROD__ = process.env.NODE_ENV === 'production'
const __DEV__ = process.env.NODE_ENV === 'development'

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
    devtool: 'eval',

    // options for resolving module requests (does not apply to resolving to loaders)
    resolve: resolve(),

    plugins: plugins(),

    // The configuration regarding modules
    module: modules(),

    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules:  web | node | webworker etc...
    target: 'web',

    name: 'client'
}

function entry() {
    let entry = { app: null, vendor }
    let app = [path.resolve(appConfig.paths.client, './index')]
    if (!__PROD__) app.unshift('webpack-hot-middleware/client?reload=true')
    entry.app = app
    return entry
}

function output() {
    return {
        // the target directory for all output files must be an absolute path
        // path: path.join(__dirname, '/dist', '/assets'),
        path: appConfig.paths.dist,

        // the filename template for entry chunks: "bundle.js" "[name].js" "[chunkhash].js"
        filename: '[name].[hash].js',

        // the url to the output directory resolved relative to the HTML page
        publicPath: __PROD__ ? '/' : `http://${appConfig.devServer.host}:${appConfig.devServer.port}/`
    }
}

function plugins() {
    log('Enable common plugins: Define, LoaderOptions, HtmlWebpack, CommonsChunk')
    const common = [
        // map variables
        new webpack.DefinePlugin(appConfig.globals),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    cssnano({
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions']
                        },
                        discardComments: {
                            removeAll: true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: true
                    })
                ],
                sassLoader: {
                    includePaths: path.resolve(appConfig.paths.client, './styles')
                }
            }
        }),

        // parse html
        new HtmlWebpackPlugin({
            template: path.resolve(appConfig.paths.public, './index.html'),
            hash: false,
            favicon: path.resolve(appConfig.paths.public, './favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: { collapseWhitespace: true }
        }),

        // split bundles
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
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
    } else {
        log('Enable plugins for development: HotModuleReplacement, NamedModules, NoErrors')
        return common.concat([
            // enable HMR globally
            new webpack.HotModuleReplacementPlugin(),
            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
            new webpack.NoErrorsPlugin()
        ])
    }
}

function resolve() {
    return {
        modules: [
            'node_modules',
            appConfig.paths.client
        ],
        extensions: ['.js', '.jsx', '.json']
    }
}

function modules() {
    // cssnano minimizes already so disable minimize in cssLoader
    const cssLoader = 'css-loader?modules&sourceMap&-minimizeimportLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

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
                    appConfig.paths.client
                ],
                exclude: [
                    /node_modules/,
                ],
                use: __PROD__ ? [{ loader: 'babel-loader' }]
                    : [
                        { loader: 'react-hot-loader' },
                        { loader: 'babel-loader' }
                    ]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    cssLoader,
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    cssLoader,
                    'postcss-loader',
                    'sass-loader?sourceMap'
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

if (!__DEV__) {
    log('Adding ExtractTextPlugin to CSS loaders.')

    // extract all text from css
    config.module.rules.filter((rules) => {
        return rules.loaders && rules.loaders.find((name) => {
            return /css/.test(name.split('?')[0])
        })
    }).forEach((loader) => {
        const first = loader.loaders[0]
        const rest = loader.loaders.slice(1)
        loader.loader = ExtractTextPlugin.extract({
            fallbackLoader: first,
            loader: rest.join('!')
        })
        delete loader.loaders
    })

    // place all extracted text into a file
    config.plugins.push(
        new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: true })
    )
}

module.exports = config
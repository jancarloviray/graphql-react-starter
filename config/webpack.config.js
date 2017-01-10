'use strict' // eslint-disable-line strict

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appConfig = require('./app.config')

const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
    // The base directory, an absolute path, for resolving entry points and loaders from configuration. 
    // `entry` and `module.rules.loader` options are resolved relative to this directory
    context: path.resolve(__dirname, './'),

    // The point or points to enter the application. At this point, the application starts executing. 
    // If an array is passed, all items will be executed. Simple rule: one entry point per HTML page.
    // SPA: one entry point. MPA: multiple entry points https://webpack.js.org/configuration/entry-context
    entry: entry(),

    // enhance debugging by adding meta info for the browser devtools: 'source-map' | 'eval'
    devtool: 'eval',

    // options for resolving module requests (does not apply to resolving to loaders)
    resolve: resolve(),

    // Options related to how webpack emits results
    output: output(),

    plugins: plugins(),

    // The configuration regarding modules
    module: modules(),

    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules:  web | node | webworker etc...
    target: 'web',

    name: 'client'
}

function output() {
    return {
        // the target directory for all output files must be an absolute path
        // path: path.join(__dirname, '/dist', '/assets'),
        path: appConfig.paths.dist,

        // the filename template for entry chunks: "bundle.js" "[name].js" "[chunkhash].js"
        filename: 'bundle.js',

        // the url to the output directory resolved relative to the HTML page
        publicPath: __PROD__ ? '/' : `http://${appConfig.devServer.host}:${appConfig.devServer.port}/`
    }
}

function plugins() {
    const common = [
        // map variables
        new webpack.DefinePlugin(appConfig.globals),

        // optimize order of modules based on how often it is used
        new webpack.optimize.OccurrenceOrderPlugin(),

        // uglify and minify javascript files
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: false
        }),

        // parse html
        new HtmlWebpackPlugin({
            template: path.resolve(appConfig.paths.public, './index.html'),
            hash: false,
            favicon: path.resolve(appConfig.paths.public, './favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: { collapseWhitespace: true }
        })
    ]

    if (__PROD__) {
        return common.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    unused: true,
                    dead_code: true,
                    warnings: false
                }
            })
        ])
    } else {
        return common.concat([
            // enable HMR globally
            new webpack.HotModuleReplacementPlugin(),
            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
            new webpack.NoErrorsPlugin()
        ])
    }
}

function entry() {
    let common = [
        path.resolve(appConfig.paths.client, './index')
    ]
    if (!__PROD__) {
        common.unshift('webpack-hot-middleware/client?reload=true')
    }
    return common
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
    const cssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

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
                use: [
                    { loader: 'style-loader' },
                    { loader: cssLoader },
                    // { loader: 'postcss-loader' },
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: cssLoader },
                    // { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
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
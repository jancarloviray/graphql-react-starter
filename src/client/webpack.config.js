'use strict' // eslint-disable-line strict

var path = require('path')
var webpack = require('webpack')

const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
    // The base directory, an absolute path, for resolving entry points and loaders from configuration. 
    // `entry` and `module.rules.loader` options are resolved relative to this directory
    context: path.resolve(__dirname, './'),

    // enhance debugging by adding meta info for the browser devtools: 'source-map' | 'eval'
    devtool: 'eval',

    // options for resolving module requests (does not apply to resolving to loaders)
    resolve: resolve(),

    // The point or points to enter the application. At this point, the application starts executing. 
    // If an array is passed, all items will be executed. Simple rule: one entry point per HTML page.
    // SPA: one entry point. MPA: multiple entry points https://webpack.js.org/configuration/entry-context
    entry: entry(),

    // Options related to how webpack emits results
    output: output(),

    plugins: plugins(),

    // The configuration regarding modules
    module: modules(),

    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules:  web | node | webworker etc...
    target: 'web'
}

function output() {
    return {
        // the target directory for all output files must be an absolute path
        path: path.join(__dirname, '/dist', '/assets'),

        // the filename template for entry chunks: "bundle.js" "[name].js" "[chunkhash].js"
        filename: 'bundle.js',

        // the url to the output directory resolved relative to the HTML page
        publicPath: '/assets/'
    }
}

function plugins() {
    const common = [
        // remove duplicated modules
        new webpack.optimize.DedupePlugin(),

        // optimize order of modules based on how often it is used
        new webpack.optimize.OccurrenceOrderPlugin(),

        // uglify and minify javascript files
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
        // new ExtractTextPlugin({
        //     filename: '[name].bundle.css',
        //     allChunks: true
        // })
        // put common libraries into one bundle
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: '[name].bundle.js',
        //     // if using modules more than this, then put in commons
        //     minChunks: 2
        // })
    ]
    return __PROD__ ? common
        : common.concat([
            // enable HMR globally
            new webpack.HotModuleReplacementPlugin(),

            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
            new webpack.NoErrorsPlugin()
        ])
}

function entry() {
    let common = [
        path.resolve(__dirname, './client')
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
            path.resolve(__dirname, './universal/')
        ],
        extensions: ['.js', '.jsx']
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
                test: /\.js$/,
                include: [
                    path.join(__dirname, './')
                ],
                exclude: [
                    /node_modules/,
                ],
                use: [
                    { loader: 'react-hot-loader' },
                    { loader: 'babel-loader' }
                ]
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallbackLoader: 'style-loader',
            //         loader: 'css-loader'
            //     })
            // },
            // {
            //     test: /\.(scss|sass)$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallbackLoader: 'style-loader',
            //         loader: [
            //             'css-loader?',
            //             // 'modules&',
            //             'importLoaders=1&',
            //             'localIdentName=[name]__[local]___[hash:base64:5]&'
            //         ].join('')
            //     })
            // }

            // CSS
            // import qs from 'querystring';
            //   {
            //     test: /\.css$/,
            //     include: path.join(__dirname, 'client'),
            //     loader: 'style-loader!css-loader?' + qs.stringify({
            //       modules: true,
            //       importLoaders: 1,
            //       localIdentName: '[path][name]-[local]'
            //     })
            //   }
        ],
    }
}

module.exports = config
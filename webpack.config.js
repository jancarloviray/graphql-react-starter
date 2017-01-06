const path = require('path')
const webpack = require('webpack')

// extracts text from bundle into a file
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// allows you to define external modules that should not be bundled
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'

const productionPluginDefine = isProduction ? [
    // map values to constiables that will be replaced during build
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
] : []

const clientLoaders = isProduction ? productionPluginDefine.concat([
    // remove duplicated modules
    new webpack.optimize.DedupePlugin(),
    // optimize order of modules based on how often it is used
    new webpack.optimize.OccurrenceOrderPlugin(),
    // uglify and minify javascript files
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: false
    }),
    // put common libraries into one bundle
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'commons',
    //     filename: '[name].bundle.js',
    //     // if using modules more than this, then put in commons
    //     minChunks: 2
    // })
]) : []

const commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
]

const PATHS = {
    app: path.join(__dirname, './src/app/'),
    server: path.join(__dirname, './'),
    dist: path.join(__dirname, './dist/')
}

const clientConfig = {
    name: 'app',

    // string 
    // The base directory, an absolute path, for resolving entry points 
    // and loaders from configuration. `entry` and `module.rules.loader`
    // options are resolved relative to this directory
    context: PATHS.app,

    // string | object | array
    // The point or points to enter the application. At this point, the
    // application starts executing. If an array is passed, all items
    // will be executed. Simple rule: one entry point per HTML page.
    // SPA: one entry point. MPA: multiple entry points. When combining
    // with output.library option: If an array is passed, only the last
    // item is exported
    // Examples:
    // Multple files, bundled together:
    // entry: { app: ['./home.js', './events.js'] },
    // output: { filename: '[name].bundle.js' },
    // Multiple files, multiple outputs:
    // entry: { home: './home.js', events: './events.js' },
    // output: { filename: '[name].bundle.js' },
    // https://webpack.js.org/configuration/entry-context/#entry
    entry: {
        home: './browser.js'
    },

    // Options related to how webpack emits results
    output: {
        // string
        // the target directory for all output files
        // must be an absolute path
        path: path.resolve(PATHS.dist, './assets'),

        // string
        // the url to the output directory resolved relative to the
        // HTML page
        publicPath: '/',

        // string
        // the filename template for entry chunks
        // "bundle.js"
        // "[name].js"
        // "[chunkhash].js"
        filename: '[name].bundle.js',
    },

    // The configuration regarding modules
    module: {

        // Rules for modules
        rules: [
            {
                test: /\.js$/,
                include: [
                    PATHS.app
                ],
                exclude: [
                    /node_modules/,
                ],
                use: [{
                    // the loader that should be applied
                    loader: 'babel-loader',
                    // options for the loader
                    options: {
                        presets: [
                            'env',
                            'react',
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader?',
                        // 'modules&',
                        'importLoaders=1&',
                        'localIdentName=[name]__[local]___[hash:base64:5]&'
                    ].join('')
                })
            }
        ],
    },
    plugins: clientLoaders.concat([
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true
        })
    ]),
    // options for resolving module requests 
    // (does not apply to resolving to loaders)
    resolve: {
        modules: ['node_modules'],
        // extensions that are used
        extensions: ['.js', '.jsx'],
    },

    performance: {
        hints: 'warning',
        maxAssetSize: 200000,
        maxEntrypointSize: 400000
    },

    // enhance debugging by adding meta info for the browser devtools
    // most detailed / slowest: 'source-map'
    // least detailed / fastest: 'eval'
    devtool: 'eval',

    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    // web | node | webworker etc...
    target: 'web',
}

const serverConfig = {
    name: 'server',
    context: PATHS.server,
    entry: [
        './server.js'
    ],
    output: {
        path: PATHS.dist,
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [
        nodeExternals()
    ],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },
    plugins: productionPluginDefine,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'env',
                        'react',
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'null'
            },
            {
                test: /\.(scss|sass)$/,
                loader: [
                    'css-loader?',
                    // 'modules&',
                    'importLoaders=1&',
                    'localIdentName=[name]__[local]___[hash:base64:5]&'
                ].join('')
            }
        ].concat(commonLoaders)
    },
    resolve: {
        modules: ['node_modules']
    }
}

module.exports = [
    clientConfig,
    serverConfig
]
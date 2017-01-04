var webpack = require('webpack')

// extracts text from bundle into a file
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// allows you to define external modules that should not be bundled
var nodeExternals = require('webpack-node-externals')

var isProduction = process.env.NODE_ENV === 'production'

var productionPluginDefine = isProduction ? [
    // map values to variables that will be replaced during build
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
] : []

var clientLoaders = isProduction ? productionPluginDefine.concat([
    // remove duplicated modules
    new webpack.optimize.DedupePlugin(),
    // optimize order of modules based on how often it is used
    new webpack.optimize.OccurrenceOrderPlugin(),
    // uglify and minify javascript files
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: false
    })
]) : []

var commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
]

module.exports = [
    // SERVER
    {
        entry: './server.js',
        output: {
            path: './dist',
            filename: 'server.js',
            publicPath: '/'
            // libraryTarget: 'commonjs2'
        },
        target: 'node',
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },
        externals: nodeExternals(),
        plugins: productionPluginDefine,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                }
            ].concat(commonLoaders)
        }
    },
    // CLIENT
    {
        entry: './src/app/browser.js',
        output: {
            path: './dist/assets',
            publicPath: '/',
            filename: 'bundle.js',
        },
        plugins: clientLoaders.concat([
            new ExtractTextPlugin('index.css', {
                allChunks: true
            })
        ]),
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('css|sass')
                }
            ],
            resolve: {
                extensions: ['', '.js', '.jsx']
            }
        }
    }
]
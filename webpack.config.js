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
    })
]) : []

const commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
]

const clientConfig = {
    name: 'client',
    entry: [
        './src/app/browser.js'
    ],
    output: {
        path: path.join(__dirname, '/dist/assets'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?modules& importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            }
        ],
    },
    plugins: clientLoaders.concat([
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]),
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: __dirname
    }
}

const serverConfig = {
    name: 'server',
    entry: [
        './server.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
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
    externals: [nodeExternals()],
    plugins: productionPluginDefine,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.css$/,
                loader: 'null'
            },
            {
                test: /\.scss$/,
                loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ].concat(commonLoaders)
    },
    resolver: {
        root: __dirname
    }
}

module.exports = [serverConfig, clientConfig]
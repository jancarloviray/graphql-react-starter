const express = require('express')
const debug = require('debug')
const path = require('path')
const webpack = require('webpack')
const compression = require('compression')

const config = require('../../config')

const log = debug('app:client')
const app = express()

// gzip 
app.use(compression())

if (config.app.env === 'development') {
    const compiler = webpack(config.webpack)

    log(`Enabling webpack-dev-middleware. publicPath at ${config.webpack.output.publicPath}`)
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.webpack.output.publicPath,
        hot: true,
        noInfo: false,
        quiet: false,
        stats: { colors: true, chunks: false, chunkModules: false }
    }))

    log('Enabling webpack-hot-middleware')
    app.use(require('webpack-hot-middleware')(compiler))

    log(`Adding express static middleware with dist at ${config.app.paths.dist}`)
    app.use(express.static(config.app.paths.dist))

    // Catch all routes and sends to /index.html file
    app.use('*', (req, res, next) => {
        // https://github.com/ampedandwired/html-webpack-plugin/issues/145
        const filename = path.join(compiler.outputPath, 'index.html')
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) return next(err)
            res.set('content-type', 'text/html')
            res.status(200).send(result)
            res.end()
        })
    })
} else {
    // Here, we can also do Universal Rendering. Check this post for more information:
    // https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md
    log('WARNING: The server is being run outside development mode. This is not recommended in production. Precompile the project first, and serve the static files using something like Nginx.')
    app.use(express.static(config.app.paths.dist))
}

app.listen(config.app.devServer.port)
log(`Server started at http://localhost:${config.app.devServer.port}`)
const express = require('express')
const debug = require('debug')
const path = require('path')
const webpack = require('webpack')
const compression = require('compression')
const fs = require('fs')

const config = require('../../config')

const log = debug('app:client')
const app = express()

// gzip
app.use(compression())

if (config.client.env === 'development') {
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

  log(`Adding express static middleware with dist at ${config.client.paths.dist}`)
  app.use(express.static(config.client.paths.dist))

  const indexHtml = path.join(compiler.outputPath, 'index.html')
  log(`All routes directed to ${indexHtml}`)

  app.use('*', (req, res, next) => {
    // https://github.com/ampedandwired/html-webpack-plugin/issues/145
    compiler.outputFileSystem.readFile(indexHtml, (err, result) => {
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
  app.use(express.static(config.client.paths.dist))

  const indexHtml = path.join(config.client.paths.dist, 'index.html')
  log(`All routes directed to ${indexHtml}`)

  app.use('*', (req, res, next) => {
    fs.readFile(indexHtml, (err, result) => {
      if (err) return next(err)
      res.set('content-type', 'text/html')
      res.status(200).send(result)
      res.end()
    })
  })
}

app.listen(config.client.devServer.client_port)
log(`Server started at http://localhost:${config.client.devServer.client_port}`)

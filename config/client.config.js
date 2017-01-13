const path = require('path')
const ip = require('ip')

module.exports = {
  env: process.env.NODE_ENV,
  paths: {
    dist: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../src/client/public'),
    client: path.resolve(__dirname, '../src/client'),
    api: path.resolve(__dirname, '../src/api/')
  },
  devServer: {
    client_port: process.env.CLIENT_PORT || 3000,
    host: ip.address(),
  },
  globals: {
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'CLIENT_PORT': process.env.CLIENT_PORT,
      'API_PORT': process.env.API_PORT,
    },
    '__DEV__': process.env.NODE_ENV === 'development',
    '__PROD__': process.env.NODE_ENV === 'production',
    '__CLIENT_PORT__': process.env.CLIENT_PORT,
    '__API_PORT__': process.env.API_PORT,
  },
}

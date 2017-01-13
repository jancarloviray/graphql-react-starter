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
    port: process.env.PORT || 3000,
    host: ip.address(),
  },
  globals: {
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'PORT': process.env.PORT,
      'API_PORT': process.env.API_PORT,
    },
    '__DEV__': process.env.NODE_ENV === 'development',
    '__PROD__': process.env.NODE_ENV === 'production',
    '__PORT__': process.env.PORT,
    '__API_PORT__': process.env.API_PORT,
  },
}

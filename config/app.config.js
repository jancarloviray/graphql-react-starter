const path = require('path')
const ip = require('ip')

module.exports = {
  env: process.env.NODE_ENV,
  paths: {
    dist: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../src/client/public'),
    client: path.resolve(__dirname, '../src/client')
  },
  devServer: {
    port: 3000,
    host: ip.address(),
  },
  globals: {
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    '__DEV__': process.env.NODE_ENV === 'development',
    '__PROD__': process.env.NODE_ENV === 'production',
  },
}
const __PROD__ = process.env.NODE_ENV === 'production'

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'api',
      script: __PROD__ ? './dist/api/index.js' : './src/api/index.js',
      watch: __PROD__ ? false : ['./src/api'],
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
        DEBUG: process.env.DEBUG,
        API_PORT: process.env.API_PORT
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: process.env.DEBUG,
        API_PORT: process.env.API_PORT
      }
    },

    // Second application
    {
      name: 'client',
      // for production mode, just use a node webserver for now..
      script: './src/client/devServer.js',
      // we have hot-loading already so no need for watch in client
      watch: false,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
        DEBUG: process.env.DEBUG,
        PORT: process.env.PORT,
        API_PORT: process.env.API_PORT
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: process.env.DEBUG,
        PORT: process.env.PORT,
        API_PORT: process.env.API_PORT
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 startOrRestart ecosystem.json --env production'
  //   },
  //   dev: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/development',
  //     'post-deploy': 'npm install && pm2 startOrRestart ecosystem.json --env dev',
  //     env: {
  //       NODE_ENV: 'dev'
  //     }
  //   }
  // }
}

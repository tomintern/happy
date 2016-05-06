'use strict';

require('dotenv').config();

module.exports = {
  server: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 8000,
    routes: {
      cors: true
    }
  },
  database: process.env.DATABASE || 'mongodb://localhost:27017/happy_db'
}

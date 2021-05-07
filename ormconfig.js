process = require('process')

configs = {
    "production": {},
    "development": {
        "type": "postgres",
        "host": "db",
        "port": 5432,
        "username": "postgres",
        "password": "postgres",
        "database": "postgres",
        "synchronize": true
    }
}

environment = process.env['NODE_ENV'] || 'production'

module.exports = configs[environment]
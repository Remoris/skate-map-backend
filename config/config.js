
const env = process.env.NODE_ENV || 'production'

configs = {

	development: {
		database: {
			USER: 'postgres',
			PASSWORD: 'postgres',
			DB: 'postgres',
			options: {
				dialect: 'postgres',
				host: 'db'
			}
		}
	},

	production: {
		database: {
			use_env_variable: 'DATABASE_URL',
			options: {
				dialect: 'postgres'
			}
		}
	}
}

module.exports = configs[env]


const dbConfig = require('../config/db.config.js')

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect
});

models = ['location']
models.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const db = {
	sequelize,
	Sequelize
}

module.exports = db 


const dbConfig = require('../config/db.config.js')

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect
});

const modelNames = ['location']
modelNames.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const models = sequelize.models

module.exports = sequelize


const dbConfig = require('../config/db.config.js')

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect
});

const modelNames = ['location', 'skate-object']
modelNames.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const models = sequelize.models

// Associations
models.Location.SkateObject = models.SkateObject.belongsToMany(models.Location, { through: 'LocationObjects' })
models.SkateObject.Location = models.Location.belongsToMany(models.SkateObject, { through: 'LocationObjects', as: 'objects' })

module.exports = sequelize

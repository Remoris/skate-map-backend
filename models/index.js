
const dbConfig = require('../config/db.config.js')

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect
});

const modelNames = ['location', 'coordinate']
modelNames.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const models = sequelize.models

models.Coordinate.Location = models.Coordinate.hasOne(models.Location, {as: 'coords', foreignKey: {
	name: 'coordsId',
	allowNull: false
}})
models.Location.Coordinate = models.Location.belongsTo(models.Coordinate, {as: 'coords'})

module.exports = sequelize

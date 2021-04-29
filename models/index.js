
const dbConfig = require('../config/config.js').database

const { Sequelize } = require('sequelize');

// Database initialization
let sequelize;

if(dbConfig.use_env_variable){
	sequelize = new Sequelize(`${process.env[dbConfig.use_env_variable]}?sslmode=require`, dbConfig.options);
}else{
	sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig.options);
}

// Reading models
const modelNames = [
	'location', 
	'skate-object', 
	'tag', 
	'rating'
]

modelNames.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const models = sequelize.models

// Associations
models.Location.SkateObject = models.SkateObject.belongsToMany(models.Location, { through: 'LocationObjects' })
models.SkateObject.Location = models.Location.belongsToMany(models.SkateObject, { through: 'LocationObjects', as: 'objects' })

models.Location.Tag = models.Tag.belongsToMany(models.Location, { through: 'LocationTags' })
models.Tag.Location = models.Location.belongsToMany(models.Tag, { through: 'LocationTags', as: 'tags' })

models.Rating.Location = models.Location.hasMany(models.Rating, { as: 'ratings' })
models.Location.Rating = models.Rating.belongsTo(models.Location)

module.exports = sequelize


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://remopas:@localhost:5432/skate-map');

models = ['location']
models.forEach(m => {
	require(`./${m}.model.js`)(sequelize)
})

const db = {
	sequelize,
	Sequelize
}

module.exports = db 

const { Sequelize, DataTypes, Model } = require('sequelize')

class SkateObject extends Model{

}

module.exports = (sequelize) => {
	return SkateObject.init({
		name: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'SkateObject'
	})
}



const { Sequelize, DataTypes, Model } = require('sequelize')

class Tag extends Model{
		
}

module.exports = (sequelize) => {
	return Tag.init({
		name: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'Tag'
	})
}



const { Sequelize, DataTypes, Model } = require('sequelize')

class SkateObject extends Model{

}

module.exports = (sequelize) => {
	return SkateObject.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		icon: {
			type: DataTypes.STRING
		}	
	}, {
		sequelize,
		modelName: 'SkateObject'
	})
}



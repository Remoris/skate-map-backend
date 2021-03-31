const { Sequelize, DataTypes, Model } = require('sequelize')

class Location extends Model{}

module.exports = (sequelize) => {
	Location.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Location'
	})
}



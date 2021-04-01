const { Sequelize, DataTypes, Model } = require('sequelize')

class Coordinate extends Model{}

module.exports = (sequelize) => {
	return Coordinate.init({
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true
		}
	}, {
		sequelize,
		modelName: 'Coordinate'
	})
}



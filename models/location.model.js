const { Sequelize, DataTypes, Model } = require('sequelize')

class Location extends Model{

	setCoords(){
		this.coords = {
			latitude: this.getDataValue('coords').coordinates[1],
			longitude: this.getDataValue('coords').coordinates[0]
		}
	}

}

module.exports = (sequelize) => {
	return Location.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		image: {
			type: DataTypes.STRING
		},
		difficulty: {
			type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
			allowNull: false
		},
		coords: {
			type: Sequelize.GEOGRAPHY('POINT')
		}
	}, {
		sequelize,
		modelName: 'Location'
	})
}



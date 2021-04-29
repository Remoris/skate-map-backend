const { Sequelize, DataTypes, Model } = require('sequelize')

class Location extends Model{

	reMapCoords(){
		this.coords = {
			latitude: this.getDataValue('coords').coordinates[1],
			longitude: this.getDataValue('coords').coordinates[0]
		}
	}

}

module.exports = (sequelize) => Location.init({
	
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

	coords: {
		type: Sequelize.GEOGRAPHY('POINT')
	},

	image: {
		type: DataTypes.STRING
	},

	difficulty: {
		type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
	},	

	averageRating: {
		type: DataTypes.VIRTUAL,
		get(){
			if(this.ratings && this.ratings.length > 0){
				return this.ratings.map(r => r.stars).reduce((p, c) => p + c, 0) / this.ratings.length
			}else{
				return undefined
			}
		},
	}

}, {
	sequelize,
	modelName: 'Location'
})



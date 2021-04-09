const { Finder } = require('../util.js')
const db = require('../models')
const { Op } = db.Sequelize
const { Location, SkateObject } = db.models

module.exports = {

	async getLocations(query, sort, filters, userLocation){

		let finder = Finder()

		finder.attributes = ['name', 'difficulty', 'id', 'image', 'coords']
		
		finder.include = [
			{ 
				model: SkateObject,
				as: 'objects',
				attributes: ['name'],
				through: { attributes: []}
			}
		]
	
		// Querying
		finder.where = query ? {
			name: {[Op.iLike]: `%${query}%`}
		} : {}
		
		// Filtering
		const filterMap = {
			'has': 'objects'
		}

		Object.entries(filters).forEach(([key, values]) => {
			if(key in filterMap){
				finder.where[`$${filterMap[key]}.name$`] = values
			}	
		})

		// Sorting
		let { latitude, longitude } = userLocation
		if(sort === 'distance' && !Number.isNaN(latitude) && !Number.isNaN(longitude)){
			finder.attributes.push([
				db.Sequelize.fn(
					'ST_Distance', 
					db.Sequelize.col('coords'),
					db.Sequelize.fn('ST_MakePoint', longitude, latitude)
				),
				'sort_distance'
			])
			finder.order = db.Sequelize.literal('sort_distance ASC')
		}

		// Fetching
		locations = await Location.findAll(finder)
		
		// Transforming
		locations.forEach(l => l.reMapCoords())
		locations = locations.map(l => l.toJSON())
		locations.forEach(l => l.objects = l.objects.map(o => o.name))

		return locations

	}

}

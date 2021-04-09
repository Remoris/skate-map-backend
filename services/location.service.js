const db = require('../models')
const { Op } = db.Sequelize
const { Location, SkateObject } = db.models

const createFinder = () => ({
	where: {},
	order: [],
	attributes: [],
	include: {}
})

module.exports = {

	async getLocations(query, sort, include, exclude, userLocation){

		let finder = createFinder()
		let { latitude, longitude } = userLocation

		finder.attributes = ['name', 'difficulty', 'id', 'image', 'coords']
		
		finder.include = {
			model:SkateObject,
			as: 'objects',
			attributes: ['name'],
			through: { attributes: []}
		}
		
		// Querying
		finder.where = query ? {
			name: {[Op.iLike]: `%${query}%`}
		} : {}
		
		// Filtering
		let filterMap = {
			'object': '',
			'tag': ''
		}
		
		// Sorting
		if(sort === 'distance' && latitude !== Number.NaN && longitude !== Number.NaN){
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

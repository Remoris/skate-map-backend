const db = require('../models')
const { Op } = db.Sequelize
const { Location, SkateObject, Tag } = db.models

module.exports = {

	async getLocations(query, sort, filters, userLocation){

		let finder = {}

		finder.attributes = ['name', 'difficulty', 'id', 'image', 'coords']
		
		finder.include = [
			{ 
				model: SkateObject,
				as: 'objects',
				attributes: ['name'],
				through: { attributes: []}
			},
			{
				model: Tag,
				as: 'tags',
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
			'has': 'objects',
			'is': 'tags'
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
		return Location.findAll(finder)
			.then(locations => locations.map(l => {
				l.reMapCoords()
				l = l.toJSON()
				l.objects = l.objects.map(o => o.name)
				l.tags = l.tags.map(t => t.name)
				return l
			}))
	},

	async getSkateObjects(){
		return SkateObject.findAll({ attributes: ['name']})
			.then(objects => objects.map(o => o.name))
	},

	async getTags(){
		return Tag.findAll({ attributes: ['name'] })
			.then(tags => tags.map(t => t.name))
	}

}

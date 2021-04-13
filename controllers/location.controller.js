const locationService = require('../services/location.service.js')
const { splitFilters, groupFilters } = require('../util.js')

module.exports.get = (req, res) => {
		
		let query = req.query.q ? req.query.q : ''
		let sort = req.query.sort ? req.query.sort : ''
		
		let filters = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter].filter(Boolean)
		filters = groupFilters(splitFilters(filters, 'filter'))

		let userLocation = {
			latitude: parseFloat(req.query.latitude),
			longitude: parseFloat(req.query.longitude)
		}

		locationService.find(query, sort, filters, userLocation)
			.then(locations => res.json({locations}))

}

module.exports.post = (req, res) => {
	
}

module.exports.skateObject = {
	get: async (req, res) => locationService.skateObject.findAll()
			.then(objects => res.json({objects})),

	post: async (req, res) => locationService.skateObject.create(req.body.)
}

module.exports.tag =	{
	get: async (req, res) => locationService.tag.findAll()
			.then(tags => res.json({tags})),

	post: async(req, res) => locationService.tag.create()
}

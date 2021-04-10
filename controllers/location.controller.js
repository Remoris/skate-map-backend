const locationService = require('../services/location.service.js')

const splitFilters = (filters) => filters.map(f => f.split(':', 2)).map(([key, value]) => ({key, value}))
const groupFilters = (filters) => filters
	.reduce((res, {key, value}) => {	
		if(key in res === false){
			res[key] = []
		}
		res[key].push(value)
		return res
	}, {})


module.exports = {
	
	async getLocations(req, res){
		
		let query = req.query.q ? req.query.q : ''
		let sort = req.query.sort ? req.query.sort : ''
		
		let filters = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter].filter(Boolean)
		filters = groupFilters(splitFilters(filters, 'filter'))

		let userLocation = {
			latitude: parseFloat(req.query.latitude),
			longitude: parseFloat(req.query.longitude)
		}

		locationService.getLocations(query, sort, filters, userLocation)
			.then(locations => res.json({locations}))

	},

	async getSkateObjects(req, res){
		locationService.getSkateObjects()
			.then(objects => res.json({objects}))
	},

	async getTags(req, res){
		locationService.getTags()
			.then(tags => res.json({tags}))
	}

}

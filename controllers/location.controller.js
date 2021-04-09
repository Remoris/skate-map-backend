const locationService = require('../services/location.service.js')

module.exports = {
	
	async getLocations(req, res){
		
		let query = req.query.q ? req.query.q : ''
		let sort = req.query.sort ? req.query.sort : ''
		
		let include = Array.isArray(req.query.include) ? req.query.include : [req.query.include].filter(Boolean)
		let exclude = Array.isArray(req.query.exclude) ? req.query.exclude : [req.query.exclude].filter(Boolean)

		let userLocation = {
			latitude: parseFloat(req.query.latitude),
			longitude: parseFloat(req.query.longitude)
		}

		locationService.getLocations(query, sort, include, exclude, userLocation)
			.then(locations => res.json({locations}))

	}
}

const db = require('../models')
const { Op } = db.Sequelize
const { Location, SkateObject } = db.models

module.exports = {
	async getLocations(req, res){

		let where = {}
		let order = []
		let attributes = ['name', 'difficulty', 'id', 'image', 'coords']
		let include = {
			model:SkateObject,
			as: 'objects'
		} 

		if(req.query.q){
			where['name'] = {[Op.iLike]: `%${req.query.q}%`}
		}

		if(req.query.sort === 'distance' && req.query.latitude && req.query.longitude){
			
			attributes.push([
				db.Sequelize.fn(
					'ST_Distance', 
					db.Sequelize.col('coords'),
					db.Sequelize.fn('ST_MakePoint', req.query.longitude, req.query.latitude)
				),
				'sort_distance'
			])

			order = db.Sequelize.literal('sort_distance ASC')
		}

		Location.findAll({
			where,
			attributes,
			include,
			order
		}).then((locations) => {
			
			locations.forEach(l => {
				l.setCoords()
			})

			locations = locations.map(l => l.toJSON())

			return res.json({ locations })
		})
	}
}

const db = require('../models')
const { Op } = db.Sequelize
const { Location } = db.models

module.exports = {
	async getLocations(req, res){

		let where = {
		}

		if(req.query.q){
			where['name'] = {[Op.like]: req.query.q}
		}

		Location.findAll({
			where,
			attributes: ['name', 'difficulty', 'id'],
			include: {
				model: db.models.Coordinate,
				as: 'coords',
				attributes: ['latitude', 'longitude']
			}
		}).then((locations) => res.json(locations.map(l => l.toJSON())))	

	}
}

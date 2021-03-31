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

		const locations = await Location.findAll({where})	

		console.log(locations)
	}
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./models')

const locations = require('./placeholder.json').locations

const indexRouter = require('./routes/index.js');
const apiRouter = require('./routes/api.router.js');

const setupApp = () => {
	const app = express();
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/', indexRouter);
	app.use('/api/v1', apiRouter);
	return app
}

const connectDB = (retry = true) => db.authenticate()
	.then(() => {
		console.log('database connection established')
		setupDB()
	})
	.catch(e => {	
		console.error('database connection failed', e)
		if(retry){ setTimeout(connectDB, 5000) }
	})

const setupDB = () => db.sync({force: true}).then(() => {
	locations.forEach(l => {
		l.coords = db.Sequelize.fn('ST_MakePoint', l.coords.longitude, l.coords.latitude)
		db.models.Location.create(l, {
			include: [{
				association: db.models.SkateObject.Location,
				as: 'objects'
			}]
		})
	})
}).catch(e => {
	console.error(e)
	process.exit(1)
})

connectDB();

module.exports = setupApp();

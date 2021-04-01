const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./models')

db.authenticate()
	.then(() => console.log('database connection established'))
	.catch((e) => console.error('database connection failed', e));

const locations = require('./placeholder.json').locations

db.sync({force: true}).then(() => {
	locations.forEach(l => db.models.Location.create(l, {
		include: [{
			association: db.models.Location.Coordinate
		}]
	}))
})


const indexRouter = require('./routes/index.js');
const apiRouter = require('./routes/api.router.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

module.exports = app;

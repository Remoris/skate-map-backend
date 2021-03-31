const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://remopas:@localhost:5432/skate-map');


sequelize.authenticate()
	.then(() => console.log('database connection established'))
	.catch((e) => console.error('database connection failed', e));

sequelize.sync({force: true})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

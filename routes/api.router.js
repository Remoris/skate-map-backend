const express = require('express');
const router = express.Router();

const locationRouter = require('./location.router.js')

router.use('/locations', locationRouter)

module.exports = router;

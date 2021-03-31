
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller.js')

router.get('/', locationController.getLocations);

module.exports = router;

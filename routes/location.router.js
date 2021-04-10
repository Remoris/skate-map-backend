
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller.js')

router.get('/', locationController.getLocations);
router.get('/objects', locationController.getSkateObjects)
router.get('/tags', locationController.getTags)

module.exports = router;

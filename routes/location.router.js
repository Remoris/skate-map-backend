
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller.js')

router.get('/', locationController.get);
router.post('/', locationController.post)

router.get('/objects', locationController.skateObject.get)
router.post('/objects', locationController.skateObject.post)

router.get('/tags', locationController.tag.get)
router.post('/tags', locationController.tag.post)

module.exports = router;

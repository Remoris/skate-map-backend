const express = require('express');
const router = express.Router();

const locationRouter = require('./location.router.js')

router.use('/locations', locationRouter)

// Error Handling
router.use((err, req, res, next) => {
	res.status(500).send({message: `Server Error: ${err.message}`})
})

module.exports = router;

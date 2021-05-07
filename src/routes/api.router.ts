import express from "express"
import { locationRouter } from "../routes/location.router"

const apiRouter = express.Router()

apiRouter.use('/locations', locationRouter)
// Error Handling
//router.use((err, req, res, next) => {
//	res.status(500).send({message: `Server Error: ${err.message}`})
//})

export { apiRouter };
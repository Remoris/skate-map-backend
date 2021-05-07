
import express from "express"
import { locationController } from "../controllers/location.controller"

const locationRouter = express.Router();

locationRouter.get('/', locationController.find);
locationRouter.post('/', locationController.post)

export { locationRouter };

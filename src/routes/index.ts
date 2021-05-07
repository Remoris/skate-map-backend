import express from "express"
import { apiRouter } from "../routes/api.router"

const indexRouter = express.Router();

indexRouter.use('/api/v1', apiRouter)

indexRouter.get('/', function(req, res) {
  res.json({'status': 'succes'});
});

export { indexRouter };

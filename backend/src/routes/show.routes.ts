import { Router } from "express"
import { ShowController } from "../controllers/show.controller.js";
import { ShowService } from "../services/show.service.js";
import { ShowRepository } from "../repositories/show.repository.js";
import pool from "../database/connection.js"

const showRouter = Router();

const showRepository = new ShowRepository(pool);
const showService = new ShowService(showRepository);
const showController = new ShowController(showService);

showRouter.get('/', (req, res) => showController.getShows(req, res));
showRouter.get('/:id', (req, res) => showController.getShow(req, res));

export default showRouter;
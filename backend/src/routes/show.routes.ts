import { Router } from "express"
import { ShowController } from "../controllers/show.controller.js";
import { ShowService } from "../services/show.service.js";
import { ShowRepository } from "../repositories/show.repository.js";
import pool from "../database/connection.js"
import validateId from "../middleware/validateShowId.middleware.js";

const showRouter = Router();

const showRepository = new ShowRepository(pool);
const showService = new ShowService(showRepository);
const showController = new ShowController(showService);

showRouter.get('/', (req, res) => showController.getShows(req, res));
showRouter.get('/:showId', validateId("showId"), (req, res) => showController.getShowById(req, res));
showRouter.get('/:showId/actors', validateId("showId"), (req, res) => showController.getActorsInShow(req, res));
showRouter.get('/:showId/episodes', validateId("showId"), (req, res) => showController.getEpisodesInShow(req, res));
showRouter.get('/:showId/episodes/:episodeId', validateId("showId"), validateId("episodeId"), 
    (req, res) => showController.getEpisodeInShow(req, res)
);

export default showRouter;
import { Router } from "express";
import pool from "../database/connection.js";
import { ActorRepository } from "../repositories/actor.repository.js";
import { ActorService } from "../services/actor.service.js";
import { ActorController } from "../controllers/actor.controller.js";
import validateId from "../middleware/validateId.middleware.js";

const actorRouter = Router();

const actorRepository = new ActorRepository(pool);
const actorService = new ActorService(actorRepository);
const actorController = new ActorController(actorService);

actorRouter.get('/', (req, res) => actorController.getActors(req, res));
actorRouter.get('/:actorId', validateId("actorId"), (req, res) => actorController.getActorById(req, res));
actorRouter.get('/:actorId/shows', validateId("actorId"), (req, res) => actorController.getShowsOfActor(req, res));

export default actorRouter;
import { Router } from "express";
import pool from "../database/connection";
import { ActorRepository } from "../repositories/actor.repository";
import { ActorService } from "../services/actor.service";
import { ActorController } from "../controllers/actor.controller";
import validateId from "../middleware/validateId.middleware";

const actorRouter = Router();

const actorRepository = new ActorRepository(pool);
const actorService = new ActorService(actorRepository);
const actorController = new ActorController(actorService);

actorRouter.get('/', (req, res) => actorController.getActors(req, res));
actorRouter.get('/:actorId', validateId("actorId"), (req, res) => actorController.getActorById(req, res));
actorRouter.get('/:actorId/shows', validateId("actorId"), (req, res) => actorController.getShowsOfActor(req, res));

export default actorRouter;
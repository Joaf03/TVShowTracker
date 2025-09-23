import { ActorRepository } from "../repositories/actor.repository.js";
import { Actor, Show } from "../types.js";

export class ActorService {
    constructor(private actorRepository: ActorRepository) {}

    async getActors() : Promise<Actor[]> {
        const actors = await this.actorRepository.findAll();

        if (!actors || actors.length === 0) {
            throw Error("No actors available");
        }

        return actors;
    }

    async getActorById(id: number) : Promise<Actor> {
        const actor = await this.actorRepository.findById(id);

        if (!actor) {
            throw Error("Actor not found");
        }
        return actor;
    }

    async getShowsOfActor(id: number) : Promise<Show[] | null> {
        const actor = await this.actorRepository.findById(id);

        if (!actor) {
            throw Error("Actor not found");
        }

        const shows =  await this.actorRepository.findShowsByActorId(id);

        return shows;
    }
}
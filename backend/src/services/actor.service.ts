import { ActorRepository } from "../repositories/actor.repository";
import { Actor } from "../types";

export class ActorService {
    constructor(private actorRepository: ActorRepository) {}

    async getActors() : Promise<Actor[]> {
        const actors = await this.actorRepository.findAll();

        if (!actors) {
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

    async getShowsOfActor(id: number) : Promise<Actor[] | null> {
        const actor = await this.actorRepository.findById(id);

        if (!actor) {
            throw Error("Actor not found");
        }

        const shows =  await this.actorRepository.findShowsByActorId(id);

        return shows;
    }
}
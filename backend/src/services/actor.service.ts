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
}
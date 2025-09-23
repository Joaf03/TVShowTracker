import { Pool } from "pg"
import { Actor, Show } from "../types.js";

export class ActorRepository {
    constructor(private pool: Pool) {}

    async findAll() : Promise<Actor[]>{
        const result = await this.pool.query("SELECT * FROM actors");
        return result.rows;
    }

    async findById(id: number) : Promise<Actor | null> {
        const result = await this.pool.query("SELECT * FROM actors WHERE id = $1", [id]);
        return result.rows[0] || null;
    }

    async findShowsByActorId(id: number) : Promise<Show[] | null> {

        const result = await this.pool.query(
            "SELECT * FROM shows s JOIN show_actors sa ON s.id = sa.show_id WHERE sa.actor_id = $1", [id]
        );
        return result.rows;
    }
}
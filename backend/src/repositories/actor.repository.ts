import { Pool } from "pg"
import { Actor } from "../types";

export class ActorRepository {
    constructor(private pool: Pool) {}

    async findAll() : Promise<Actor[]>{
        const result = await this.pool.query("SELECT * FROM actors");
        return result.rows;
    }
}
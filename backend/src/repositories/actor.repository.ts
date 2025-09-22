import { Pool } from "pg"
import { Actor } from "../types";

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
}
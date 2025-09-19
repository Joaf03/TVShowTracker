import { Pool } from "pg"

export interface Show {
    id: number,
    title: string,
    description: string,
    genre: string,
    start_date: string,
    end_date: string | null,
    created_at: string,
    updated_at: string
}

export class ShowRepository {
    constructor(private pool : Pool) {}

    async findAll() : Promise<Show[]>{
        const result = await this.pool.query("SELECT * FROM shows");
        return result.rows;
    }

    async findById(id: number) : Promise<Show | null> {
        const result = await this.pool.query("SELECT * FROM shows WHERE id = $1", [id]);
        return result.rows[0] || null;
    }
}
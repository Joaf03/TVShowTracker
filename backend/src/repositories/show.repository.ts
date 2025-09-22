import { Pool } from "pg"
import { Show, Episode, Actor } from '../types.js'

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

    async findActorsByShowId(id: number) : Promise<Actor[] | null> {
        const result = await this.pool.query(
            "SELECT * FROM actors a JOIN show_actors sa ON a.id = sa.actor_id WHERE sa.show_id = $1", [id]
        );
        return result.rows;
    }

    async findEpisodesByShowId(id: number) : Promise<Episode[] | null> {
        const result = await this.pool.query("SELECT * FROM episodes WHERE show_id = $1", [id]);
        return result.rows;
    }

    async findEpisodeByShowIdAndEpisodeId(showId: number, episodeId: number) : Promise<Episode | null> {
        const result = await this.pool.query("SELECT * FROM episodes WHERE id = $1 AND show_id = $2", [episodeId, showId]);
        console.log(result.rows)
        return result.rows[0] || null;
    }
}
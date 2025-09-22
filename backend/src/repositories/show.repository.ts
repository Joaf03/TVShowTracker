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

export interface Actor {
    id: number,
    name: string,
    date_of_birth: string,
    nationality: string,
    created_at: string,
    updated_at: string
}

export interface Episode {
    id: number,
    show_id: number,
    title: string,
    season_number: number | null,
    episode_number: number,
    duration_minutes: number,
    air_date: string,
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
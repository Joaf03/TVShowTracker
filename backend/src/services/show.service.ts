import { Show, Actor, Episode } from "../types.js"
import { ShowRepository } from "../repositories/show.repository.js";

export class ShowService {
    constructor(private showRepository : ShowRepository) {}

    async getShows() : Promise<Show[]> {
        const shows = await this.showRepository.findAll();

        if (!shows || shows.length == 0) {
            throw Error("No shows available")
        }
        return shows;
    }

    async getShowById(id: number) : Promise<Show> {
        const show = await this.showRepository.findById(id);

        if (!show) {
            throw Error("Show not found");
        }
        return show;
    }

    async getActorsInShow(id: number) : Promise<Actor[] | null> {
        const show = await this.showRepository.findById(id);

        if (!show) {
            throw Error("Show not found");
        }

        const actors = await this.showRepository.findActorsByShowId(id);

        return actors;
    }

    async getEpisodesInShow(id: number) : Promise<Episode[] | null> {
        const show = await this.showRepository.findById(id);

        if (!show) {
            throw Error("Show not found");
        }

        const episodes = await this.showRepository.findEpisodesByShowId(id);

        return episodes;
    }

    async getEpisodeInShow(showId: number, episodeId: number) : Promise<Episode> {
        const show = await this.showRepository.findById(showId);

        if (!show) {
            throw Error("Show not found");
        }

        const episode = await this.showRepository.findEpisodeByShowIdAndEpisodeId(showId, episodeId);
 
        if (!episode) {
            throw Error("Episode not found");
        }

        return episode;
    }
}
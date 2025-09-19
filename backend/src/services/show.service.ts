import { Show, ShowRepository } from "../repositories/show.repository.js"

export class ShowService {
    constructor(private showRepository : ShowRepository) {}

    async getShows() : Promise<Show[]> {
        const shows = await this.showRepository.findAll();

        if (!shows || shows.length == 0) {
            throw Error("No shows available.")
        }
        return shows;
    }

    
}
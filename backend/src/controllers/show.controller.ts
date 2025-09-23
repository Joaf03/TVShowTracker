import { ShowService } from "../services/show.service.js";
import { Request, Response } from "express"

export class ShowController {
    constructor(private showService : ShowService) {}

    async getShows(req: Request, res: Response) : Promise<void> {
        try {
            const genre = req.query.genre as string;
            const shows = genre ?
                await this.showService.getShows(genre) :
                await this.showService.getShows();
            res.json({
                success: true,
                data: shows,
                count: shows.length
            });
        } catch (error: any) { 
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async getShowById(req: Request, res: Response) : Promise<void> {
        try {
            const showId = parseInt(req.params.showId, 10);

            const show = await this.showService.getShowById(showId);

            res.json({
                success: true,
                data: show,
            });
        } catch (error: any) { 
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async getActorsInShow(req: Request, res: Response) : Promise<void> {
        try {
            const showId = parseInt(req.params.showId, 10);

            const actors = await this.showService.getActorsInShow(showId);

            res.json({
                success: true,
                data: actors,
            });
        } catch (error: any) { 
            res.status(404).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        } 
    }

    async getEpisodesInShow(req: Request, res: Response) : Promise<void> {
        try {
            const showId = parseInt(req.params.showId, 10);

            const episodes = await this.showService.getEpisodesInShow(showId);

            res.json({
                success: true,
                data: episodes,
            });
        } catch (error: any) { 
            res.status(404).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        } 
    }

    async getEpisodeInShow(req: Request, res: Response) : Promise<void> {
        try {
            const showId = parseInt(req.params.showId, 10);
            const episodeId = parseInt(req.params.episodeId, 10);

            const episode = await this.showService.getEpisodeInShow(showId, episodeId);
            
            res.json({
                success: true,
                data: episode,
            });
        } catch (error: any) { 
            res.status(404).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        } 
    }
}
import { ShowService } from "../services/show.service.js";
import { Request, Response } from "express"

export class ShowController {
    constructor(private showService : ShowService) {}

    async getShows(req: Request, res: Response) : Promise<void> {
        try {
            const shows = await this.showService.getShows();
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
}
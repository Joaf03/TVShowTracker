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

    async getShow(req: Request, res: Response) : Promise<void> {
        try {
            const showId = parseInt(req.params.id, 10);

            if (!Number.isInteger(showId) || showId <= 0) {
                res.status(400).json({
                    success: false,
                    error: "Invalid show ID"
                })
                return;
            }
 
            const show = await this.showService.getShow(showId);

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
}
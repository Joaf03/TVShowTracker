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

    
}
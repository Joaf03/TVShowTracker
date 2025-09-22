import { ActorService } from "../services/actor.service";
import { Request, Response } from "express";

export class ActorController {
    constructor(private actorService: ActorService) {}

    async getActors(req: Request, res: Response) : Promise<void> {
        try {
            const actors = await this.actorService.getActors();
            res.json({
                success: true,
                data: actors,
                count: actors.length
            });
        } catch (error: any) { 
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
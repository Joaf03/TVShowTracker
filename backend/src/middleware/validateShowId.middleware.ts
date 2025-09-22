import { Request, Response, NextFunction } from "express"

function validateShowId(req: Request, res: Response, next: NextFunction) {
    const showId = parseInt(req.params.showId, 10);

    if (!Number.isInteger(showId) || showId <= 0) {
        res.status(400).json({
            success: false,
            error: "Invalid show ID"
        })
        return;
    }

    next();
}

export default validateShowId;
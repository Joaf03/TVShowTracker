import { Request, Response, NextFunction } from "express"

function validateId(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const rawParam = req.params[paramName];
        const paramId = parseInt(rawParam, 10)

        if (!Number.isInteger(paramId) || paramId <= 0) {
            res.status(400).json({
                success: false,
                error: `Invalid ${paramName} value: must be a positive integer`
            })
            return;
        }

    next();
    }
}

export default validateId;
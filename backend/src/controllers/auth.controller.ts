import { AuthService } from "../services/auth.service.js";
import { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) {}

    async signUp(req: Request, res: Response) : Promise<void> {
        try {
            console.log(req.body)
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    error: "Email and password are required",
                });
                return;
            }

            const user = await this.authService.signUp(email, password);

            res.status(201).json({
                success: true,
                data: {
                    id: user?.id,
                    email: user?.email,
                    created_at: user?.created_at
                }
            });

        } catch(error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
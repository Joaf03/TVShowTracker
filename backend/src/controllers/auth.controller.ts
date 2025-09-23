import { AuthService } from "../services/auth.service.js";
import { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) {}

    async signUp(req: Request, res: Response) : Promise<void> {
        try {
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

    async logIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const token = await this.authService.logIn(email, password);

            if(!token) {
                res.status(500).json({
                    success: false,
                    error: "Failed to generate JWT token"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: token
            });

        } catch(error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
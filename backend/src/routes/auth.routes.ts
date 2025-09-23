import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import pool from "../database/connection.js";

const authRouter = Router();

const userRepository = new UserRepository(pool);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/sign-up', (req, res) => authController.signUp(req, res));

export default authRouter;
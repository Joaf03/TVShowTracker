import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs"
import { User } from "../types.js";
import jwt from "jsonwebtoken";
import env_vars from "../config/env.js";


export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async signUp(email: string, password: string) : Promise<User | null> {
        const existingUser = this.userRepository.findByEmail(email);

        if (existingUser) {
            throw Error("There's already a user with that email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  await this.userRepository.createUser(email, hashedPassword);

        return user;
    }

    async logIn(email: string, password: string) {
        const areCredentialsCorrect = await this.comparePasswords(email, password);

        if (!areCredentialsCorrect) {
            throw Error("Incorrect credentials");
        }

        const user = await this.userRepository.findByEmail(email);

        const payload = {
            "sub": user.id,
            "email": user.email,
            "iat": Math.floor(Date.now() / 1000)
        };

        const token = jwt.sign(payload, env_vars.JWT_SECRET, { expiresIn: '3h' });

        return token;
    }

    async comparePasswords(email: string, inputPassword: string) : Promise<Boolean> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw Error("No user exists with the given email");
        }

        const hashedPassword = user.password;

        return await bcrypt.compare(inputPassword, hashedPassword);
    }
}
import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs"
import { User } from "../types.js";

export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async signUp(email: string, password: string) : Promise<User | null> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  await this.userRepository.createUser(email, hashedPassword);
        return user;
    }
}
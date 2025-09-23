import { Pool, QueryResult } from "pg"
import { User } from "../types.js";

export class UserRepository {
    constructor(private pool: Pool) {}

    async createUser(email: string, hashedPassword: string) : Promise<User> {
        const result = await this.pool.query(
            "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *"
            , [email, hashedPassword]);
        return result.rows[0];
    }
}
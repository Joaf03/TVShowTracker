import { Pool } from "pg"
import env_vars from "../config/env.js"

const pool = new Pool({
    database: env_vars.DB.DATABASE,
    user: env_vars.DB.USER,
    password: env_vars.DB.PASSWORD,
    port: env_vars.DB.PORT,
    host: env_vars.DB.HOST
});

export default pool;
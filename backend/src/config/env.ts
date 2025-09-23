import { config } from "dotenv"

// Load the environment variables
config();

const required_env_vars = [
    "POSTGRES_USER",
    "POSTGRES_PASSWORD", 
    "POSTGRES_DB",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "DATABASE_URL",
    "PGADMIN_DEFAULT_EMAIL",
    "PGADMIN_DEFAULT_PASSWORD",
    "JWT_SECRET_KEY"
] as const;

for (const env_var of required_env_vars) {
    if (!process.env[env_var]) {
        throw Error(`Missing environment variable ${env_var}`);
    }
};

const env_vars = {
    DB: {
        USER: process.env.POSTGRES_USER!,
        PASSWORD: process.env.POSTGRES_PASSWORD!,
        DATABASE: process.env.POSTGRES_DB!,
        HOST: process.env.POSTGRES_HOST!,
        PORT: parseInt(process.env.POSTGRES_PORT!),
        URL: process.env.DATABASE_URL!,
    },
    PORT: process.env.HTTP_SERVER_PORT!,
    JWT_SECRET: process.env.JWT_SECRET_KEY!
} as const;

export default env_vars;
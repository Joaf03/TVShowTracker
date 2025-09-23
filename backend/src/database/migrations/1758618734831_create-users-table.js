export const up = (pgm) => {
    pgm.sql(
        `CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now()
        );`
    );
};

export const down = (pgm) => {
    pgm.sql(
        `DROP TABLE IF EXISTS users;`
    );
};

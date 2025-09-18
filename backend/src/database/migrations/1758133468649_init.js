export const up = (pgm) => {
    pgm.sql(`
        CREATE TYPE genres as ENUM (
            'Action',
            'Adventure',
            'Comedy',
            'Crime',
            'Drama',
            'Fantasy',
            'Historical',
            'Horror',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Thriller',
            'Documentary',
            'Animation',
            'Family',
            'Musical',
            'Reality'
        );

        CREATE TABLE shows (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            genre genres NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now()
        );

        CREATE TABLE episodes (
            id SERIAL PRIMARY KEY,
            show_id INTEGER NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
            title VARCHAR(50) NOT NULL,
            season_number INTEGER,
            episode_number INTEGER NOT NULL,
            duration_minutes INTEGER NOT NULL,
            air_date DATE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now(),
            UNIQUE (show_id, season_number, episode_number)
        );

        CREATE TABLE actors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            date_of_birth DATE NOT NULL,
            nationality VARCHAR(50) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now()
        );

        CREATE TABLE show_actors (
            show_id INTEGER NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
            actor_id INTEGER NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
            PRIMARY KEY (show_id, actor_id)
        );
    `);
};

export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE IF EXISTS show_actors;
        DROP TABLE IF EXISTS episodes;
        DROP TABLE IF EXISTS actors;
        DROP TABLE IF EXISTS shows;
        DROP TYPE IF EXISTS genres;
    `);
};

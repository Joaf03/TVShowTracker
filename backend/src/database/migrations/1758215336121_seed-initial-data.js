export const up = (pgm) => {
  pgm.sql(`
    INSERT INTO shows (title, description, genre, start_date, end_date)
    VALUES
      ('Breaking Bad', 'A chemistry teacher turns to crime after a cancer diagnosis.', 'Crime', '2008-01-20', '2013-09-29'),
      ('Stranger Things', 'A group of kids uncover supernatural mysteries in their town.', 'Sci-Fi', '2016-07-15', NULL),
      ('Friends', 'Six friends navigate life and love in New York City.', 'Comedy', '1994-09-22', '2004-05-06');

    INSERT INTO episodes (show_id, title, season_number, episode_number, duration_minutes, air_date)
    VALUES
      (1, 'Pilot', 1, 1, 58, '2008-01-20'),
      (1, 'Cat''s in the Bag...', 1, 2, 48, '2008-01-27'),
      (2, 'The Vanishing of Will Byers', 1, 1, 47, '2016-07-15'),
      (2, 'The Weirdo on Maple Street', 1, 2, 55, '2016-07-15'),
      (3, 'The One Where Monica Gets a Roommate', 1, 1, 22, '1994-09-22'),
      (3, 'The One with the Sonogram at the End', 1, 2, 22, '1994-09-29');

    INSERT INTO actors (name, date_of_birth, nationality)
    VALUES
      ('Bryan Cranston', '1956-03-07', 'American'),
      ('Aaron Paul', '1979-08-27', 'American'),
      ('Winona Ryder', '1971-10-29', 'American'),
      ('Millie Bobby Brown', '2004-02-19', 'British'),
      ('Jennifer Aniston', '1969-02-11', 'American'),
      ('Matthew Perry', '1969-08-19', 'American');

    INSERT INTO show_actors (show_id, actor_id)
    VALUES
      (1, 1), (1, 2), 
      (2, 3), (2, 4), 
      (3, 5), (3, 6);
  `);
};

export const down = (pgm) => {
  pgm.sql(`
    DELETE FROM show_actors;
    DELETE FROM episodes;
    DELETE FROM actors;
    DELETE FROM shows;
  `);
};

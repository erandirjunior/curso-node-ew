DROP TABLE IF EXISTS hero;

CREATE TABLE hero (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	power TEXT NOT NULL
);

INSERT INTO hero (name, power) VALUES
('Flash', 'Spess'),
('Superman', 'Force'),
('Iron Man', 'Inteligence');

SELECT * FROM hero;
SELECT * FROM hero WHERE name = 'Superman';

UPDATE hero SET power = 'Speed' WHERE id = 1;

DELETE FROM hero WHERE id = 2;

TRUNCATE TABLE hero;
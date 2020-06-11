CREATE TABLE users (
	userid serial PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE events (
	event_id serial PRIMARY KEY,
	event_name VARCHAR(255) NOT NULL,
	event_description VARCHAR(2000) NOT NULL,
	event_date DATE NOT NULL,
	event_time TIMESTAMP NOT NULL
);
CREATE TABLE users (
	userid serial PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
	event_id serial PRIMARY KEY,
	event_name VARCHAR(255) NOT NULL,
	event_description VARCHAR(2000) NOT NULL,
	event_date DATE NOT NULL,
	event_time TIMESTAMP NOT NULL
);

CREATE TABLE rsvps (
	rsvp_id serial PRIMARY KEY,
	linked_event_id VARCHAR(255) NOT NULL,
	linked_event_name VARCHAR(255) NOT NULL,
	linked_user_id VARCHAR(255) NOT NULL,
	linked_username VARCHAR(255) NOT NULL,
	rsvp_status VARCHAR(255) NOT NULL
)
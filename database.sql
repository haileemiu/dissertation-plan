CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR (1000) UNIQUE NOT NULL,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE goals (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES person, 
	name VARCHAR NOT NULL	
);

CREATE TABLE history (
	id SERIAL PRIMARY KEY,
	goal_id INT NOT NULL REFERENCES goals, 
	completed_at TIMESTAMP,
	instances_per_week INT NOT NULL
);
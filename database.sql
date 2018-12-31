-- person table that was included in the code base for login and register
-- I added the email column
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR (1000) UNIQUE NOT NULL,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

-- goals table that references the user_id, save the goal text, and the instances per week
CREATE TABLE goals (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES person, 
	goal VARCHAR NOT NULL,
	instances_per_week INT NOT NULL
);

-- goals_history table that references the goal_id (which in turn references the user_id)
-- and saves the current date on insert of new row
CREATE TABLE goals_history (
	id SERIAL PRIMARY KEY,
	goal_id INT NOT NULL REFERENCES goals, 
	completed_on DATE DEFAULT NOW()
);
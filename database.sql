-- For goal section headings
CREATE TABLE goal_types (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES person,
  title VARCHAR NOT NULL
);

-- For individual goal tasks
CREATE TABLE goal_tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  type_id INT REFERENCES goal_type,
  completed BOOLEAN DEFAULT false
);

-- For the section headings
CREATE TABLE dissertation_sections (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES person,
  name VARCHAR NOT NULL
);

-- For the steps within the sections
CREATE TABLE dissertation_steps (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  section_id INT REFERENCES dissertation_sections,
  completed BOOLEAN DEFAULT false
);


-- goals table that references the user_id, save the goal text, and the instances per week
-- CREATE TABLE goals (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INT NOT NULL REFERENCES person, 
-- 	goal VARCHAR NOT NULL,
-- 	instances_per_week INT NOT NULL
-- );

-- goals_history table that references the goal_id (which in turn references the user_id)
-- and saves the current date on insert of new row
-- CREATE TABLE goals_history (
-- 	id SERIAL PRIMARY KEY,
-- 	goal_id INT NOT NULL REFERENCES goals, 
-- 	completed_on DATE DEFAULT NOW()
-- );

-- CREATE TABLE goal_list (
--   id SERIAL PRIMARY KEY,
--   user_id INT NOT NULL REFERENCES person,
--   name VARCHAR NOT NULL,
--   completed BOOLEAN DEFAULT false
-- );

-- dissertation_plan table that saves each users dissertation plan
-- a default list will be created and added to this table when a user creates an account
-- CREATE TABLE dissertation_plan (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INT NOT NULL REFERENCES person,
-- 	name VARCHAR NOT NULL,
-- 	completed BOOLEAN DEFAULT false


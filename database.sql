CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR (1000),
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);
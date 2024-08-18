CREATE SCHEMA portfolio;
CREATE TABLE IF NOT EXISTS portfolio.projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50) NULL,
    imagePath VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS portfolio.blogs(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    body VARCHAR
);
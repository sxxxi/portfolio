CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE IF NOT EXISTS auth.credentials(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    hash VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS auth.permissions(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS auth.credential_permissions(
    credential_id SERIAL REFERENCES auth.credentials(id),
    permission_id SERIAL REFERENCES auth.permissions(id)
);
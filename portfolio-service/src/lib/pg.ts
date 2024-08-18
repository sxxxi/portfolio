import { Pool } from "pg";

export const connection: Pool = new Pool();

await connection.query("CREATE SCHEMA IF NOT EXISTS portfolio;");
await connection.query("CREATE TABLE IF NOT EXISTS portfolio.projects(" +
    "id SERIAL PRIMARY KEY," +
    "title VARCHAR(50) NOT NULL," +
    "description VARCHAR(50) NULL," +
    "imagePath VARCHAR(255) NULL" +
  ");");
import pg from "pg";
const { Pool } = pg;
import { attachPermission, createPermission, createUser, getIdByUsername } from "./authRepo";

const username = Bun.env.ADMIN_USER!
const password = Bun.env.ADMIN_PASS!
const hash = await Bun.password.hash(password);

export const db = new Pool();

export async function bootstrapDb() {
  console.log("Bootstrapping DB")
  await db.query("BEGIN;")

  await db.query("CREATE SCHEMA IF NOT EXISTS auth;");

  await db.query("CREATE TABLE IF NOT EXISTS auth.credentials(" +
      "id SERIAL PRIMARY KEY," +
      "username VARCHAR UNIQUE NOT NULL," +
      "hash VARCHAR NOT NULL" + 
    ");"
  );

  await db.query("CREATE TABLE IF NOT EXISTS auth.permissions(" +
      "id SERIAL PRIMARY KEY," + 
      "name VARCHAR(50) UNIQUE NOT NULL" + 
    ");"
  );

  await db.query("CREATE TABLE IF NOT EXISTS auth.credential_permissions(" +
      "credential_id SERIAL REFERENCES auth.credentials(id)," +
      "permission_id SERIAL REFERENCES auth.permissions(id)," +
      "CONSTRAINT unique_entry UNIQUE(credential_id, permission_id)" +
    ");"
  );
  await db.query("COMMIT;")
  
  await db.query("BEGIN;")
  try {
    await createUser(username, hash);
  } catch(err) {
    console.log("Admin exists. Aborting insert.")
  }
  const pid = await createPermission('portfolio:projects:admin');
  const uid = await getIdByUsername(username);

  if (!uid) {
    console.log("Impossible logic error. Rolling back");
    await db.query("ROLLBACK;");
    return;
  }

  await attachPermission(pid, uid!);
  await db.query("COMMIT;")
}
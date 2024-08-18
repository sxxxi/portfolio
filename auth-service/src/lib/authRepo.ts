import { db } from "./pg.js";

export interface UserModel {
  id?: number,
  username: string,
  password: string
}

export interface UserDto {
  id?: number,
  username: string,
  permissions: string
}

export interface PermissionModel  {
  id?: number,
  name: string 
}

export async function userExists(username: string): Promise<boolean> {
  const result = await db.query("SELECT COUNT(id) FROM auth.credentials WHERE username = $1;", [username]);
  return result.rows[0].count > 0
}

export async function getUserPermissions(credId: number): Promise<PermissionModel[]> {
  const result = await db.query("SELECT p.id, p.name FROM auth.permissions p JOIN auth.credential_permissions cr ON cr.permission_id = p.id WHERE cr.credential_id = $1;", [credId])
  return result.rows;
}

export async function createUser(username: string, hash: string) {
  const exists = await userExists(username);
  if (exists) throw new Error("User exists");
  return (await db.query("INSERT INTO auth.credentials (username, hash) VALUES ($1, $2) ON CONFLICT(username) DO NOTHING RETURNING id;", [username, hash])).rows[0].id;
}

export async function authenticate(username: string, password: string): Promise<number | undefined> {
  const {id, hash} = (await db.query("SELECT id, hash FROM auth.credentials WHERE username = $1;", [username])).rows[0];
  const isMatch = await Bun.password.verify(password, hash);
  if (isMatch) {
    return id
  } else {
    return undefined;
  }
}

export async function createPermission(permissionName: string) {
  return (await db.query("INSERT INTO auth.permissions(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name = $1 RETURNING id;", [permissionName])).rows[0].id;
}

export async function getIdByUsername(username: string): Promise<number | undefined> {
  const results = await db.query("SELECT id FROM auth.credentials WHERE username = $1;", [username]);
  return results.rows[0]?.id;
}

export async function attachPermission(pid: number, uid: number) {
  await db.query("INSERT INTO auth.credential_permissions(credential_id, permission_id) VALUES($1, $2) ON CONFLICT(credential_id, permission_id) DO NOTHING;", [uid, pid]);
}
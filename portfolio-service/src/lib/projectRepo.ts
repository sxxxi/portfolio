import { connection } from "./pg";

export interface ProjectModel {
  id?: number,
  title: string,
  description?: string,
  imagepath?: string
}

export async function getProjectById(id: number): Promise<ProjectModel | undefined> {
  const res = await connection.query("SELECT * FROM portfolio.projects WHERE id = $1", [ id ]);
  if (res.rows.length == 0) return Promise.resolve(undefined);
  return res.rows.map(i => i as ProjectModel)[0];
}

export async function upsertProject({id, title, description, imagepath: imagePath}: ProjectModel) {
  if (!id) {
    // Insert new
    return await connection.query(
      "INSERT INTO portfolio.projects(title, description, imagePath) VALUES ($1, $2, $3) RETURNING id;", 
      [title, description, imagePath]
    );
  } 
  // Update existing
  return await connection.query("UPDATE portfolio.projects SET title = $2, description = $3, imagePath = $4 WHERE id = $1 RETURNING id;"   
    // + "ON CONFLICT(id) DO UPDATE SET title = $2, description = $3, imagePath = $4 RETURNING id"
  , [id, title, description, imagePath]
  );
}

export async function getAllProjects(): Promise<ProjectModel[] | undefined> {
  const res = await connection.query("SELECT * FROM portfolio.projects");
  return Promise.resolve(res.rows?.map((obj: any) => obj as ProjectModel)); 
}




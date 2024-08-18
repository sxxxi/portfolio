import type { File } from "formidable";
import { getAllProjects, getProjectById, upsertProject, type ProjectModel } from "./projectRepo";
import { postImageSync } from "./consumer";
import { MEDIASTORE_DOMAIN } from "../variables";

export interface ProjectCreateDto {
  title: string,
  description?: string,
  avatar?: File
}

export interface ProjectListDto {
  title: string,
  description?: string,
  imageUrl?: string
}

export async function createProject({title, description, avatar}: ProjectCreateDto): Promise<void> {
  const model: ProjectModel = { title: title, description: description};
  return upsertProject(model).then(async (insertedItemIds) => {
    if (avatar && insertedItemIds.rows.length > 0) {
      const id = insertedItemIds.rows[0].id;
      const existing = await getProjectById(id);
      if (existing && avatar) {
        postImageSync(avatar, async (path) => {
          existing.imagepath = path;
          await upsertProject(existing).catch( err =>
            console.log(err)
          );
        });
      }
    }
  });
}

export async function listProjects(): Promise<ProjectListDto[]> {
  const projectsRaw = await getAllProjects();
  if (!projectsRaw) throw new Error("Project list empty. Server error?");
  return await Promise.all(
    projectsRaw.map(async p => {
      if (p.imagepath) {
        const getUrlResponse = await fetch(`http://${MEDIASTORE_DOMAIN}/mediastore?path=${p.imagepath}`)
          .then(data => data.json());
        p.imagepath = getUrlResponse.url 
      }
      return p
    })
  );
}
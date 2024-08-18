import express, { type Express, type NextFunction, type Request, type Response } from "express";
import formidable, { type Fields, type Files } from "formidable"
import { createProject, listProjects } from "./lib/projectService";
import { AUTH_DOMAIN, PORT } from "./variables";
import { permission } from "process";

const app: Express = express();
const basePath = "/portfolio/projects"

export interface TokenPayload {
  uid: string,
  usr: string,
  scope: string,
}
declare global {
  namespace Express {
    interface Request {
      payload: TokenPayload
    }
  }
}

const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.split(" ");
  const accessKey: string | undefined = authorization?.[1];
  
  if (!accessKey) {
    res.sendStatus(403);
  }

  const authResponse = await fetch(`http://${AUTH_DOMAIN}/verify/${accessKey}`);
  const data = await authResponse.json();
  req.payload = data.payload;
  next()
};

const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
  const payload: TokenPayload | undefined = req.payload;

  if (!payload || !payload.scope.split(" ").includes("portfolio:projects:admin")) {
    res.sendStatus(403);
  }

  next();  
}; 

app.get(`${basePath}/`, async (req: Request, res: Response) => {
  res.json({
    projects: await listProjects()
  });
});

app.post(`${basePath}/create`, validateJwt, adminAccess , (req: Request, res: Response, next: NextFunction) => {
  let form = formidable({
    allowEmptyFiles: true,
    minFileSize: 0,
  });

  form.parse(req, async (err: Error, fields: Fields, files: Files) => {
    if (err) {
      next(err);
      res.sendStatus(400);
      return;
    }
   
    const title = fields["title"]?.[0];
    const description = fields["description"]?.[0]
    const avatar = files["avatar"]?.[0]

    if (!title) {
      res.setHeader("content-type", "application/json")
      res.status(400).send(JSON.stringify({
        message: "Required fields not filled"
      }));
      return;
    }
    
    createProject({title, description, avatar}).then(() => {
      res.json({
        message: "Project created"
      });
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
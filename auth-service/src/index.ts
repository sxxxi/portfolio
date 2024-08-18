import { authenticate, createUser, getUserPermissions, type UserDto } from "./lib/authRepo";
import express from "express";
import dotenv from "dotenv";
import { bootstrapDb } from "./lib/pg";
import { buildPayload, sign, verify } from "./lib/jwtService";

dotenv.config();
const app = express();
const port = process.env.PORT!;
await bootstrapDb();

app.use(express.json());

app.post('/login', async (req, res, next) => {
  const rb = req.body;
  const username = rb.username;
  const password = rb.password;

  authenticate(username, password).then(async (id) => {
    if (!id) {
      res.sendStatus(403);
      return;
    }
    const permissions = (await getUserPermissions(id)).map(p => p.name)
    const token = await sign(buildPayload(id.toString(), username, permissions));
    res.json({
      accessToken: token
    });
  });
});

app.get("/verify/:token", async (req, res, next) => {
  res.json({
    payload: await verify(req.params.token)
  });
});



app.listen(port, () => {
  console.log("Listening on port", port);
});

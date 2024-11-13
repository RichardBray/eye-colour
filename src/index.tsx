import { Hono } from "hono";
import { serveStatic } from 'hono/bun';

import { RootPage } from "./views";
import { calculateEyeColorProbability } from "./handlers";
import { wish } from "./wish";

const app = new Hono();

app.use('/static/*', serveStatic({ root: './src' }))

// Hold form submission results in memory
let formResults: ResultArr;

export interface Result { color: string; probability: number; };
export type ResultArr = [Error | null, Result | null];

app.get("/", (c) => {
  return c.html(<RootPage result={formResults} />);
});

app.post("/submit-form", async (c) => {
  const body = await c.req.parseBody();
  const data = {
    person1: body["person_1"] as string,
    person2: body["person_2"] as string,
    children: body["children"] as string,
  };

  formResults = calculateEyeColorProbability(data);

  return c.redirect("/");
});

app.route('api/wish', wish);

export default app;

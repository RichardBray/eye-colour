import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

export const wish = new Hono();
const prisma = new PrismaClient();

wish.get("/", (c) => {
  return c.text("Welcome to the wish API");
});

wish.get("/all", async (c) => {
  const items = await prisma.item.findmany();
  return c.json(items, 200);
});

import { Hono } from "hono";
import type { TagController } from "./tag.controller";

export const createTagRouter = (controller: TagController) => {
  const tagRouter = new Hono();

  tagRouter.get("/", ...controller.findAll);
  tagRouter.post("/", ...controller.create);

  return tagRouter;
};

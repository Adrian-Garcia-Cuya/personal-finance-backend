import { Hono } from "hono";
import type { CategoryController } from "./category.controller";

export const createCategoryRouter = (controller: CategoryController) => {
  const categoryRouter = new Hono();

  categoryRouter.get("/", ...controller.findAll);
  categoryRouter.post("/", ...controller.create);

  return categoryRouter;
};

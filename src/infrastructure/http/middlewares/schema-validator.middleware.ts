import { zValidator } from "@hono/zod-validator";
import { z, ZodType } from "zod";
import type { ValidationTargets } from "hono";

export const schemaValidator = <
  T extends keyof ValidationTargets,
  S extends ZodType,
>(
  target: T,
  schema: S,
) => {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      const errorResponse = {
        success: false,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      };

      return c.json(errorResponse, 400);
    }
  });
};

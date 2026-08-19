import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { z, type ZodTypeAny } from "zod";

export const schemaValidator = <T extends keyof ValidationTargets>(
  target: T,
  schema: ZodTypeAny,
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

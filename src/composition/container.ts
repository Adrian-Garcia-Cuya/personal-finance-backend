import { UuidGenerator } from "../infrastructure/adapters/uuidGenerator";
import { buildAccountComposition } from "./modules/account.composition";
import { buildAuthComposition } from "./modules/auth.composition";
import { buildCategoryComposition } from "./modules/category.composition";
import { buildTagComposition } from "./modules/tag.composition";
import { buildTransactionComposition } from "./modules/transaction.composition";

export const buildContainer = () => {
  const uuidGenerator = new UuidGenerator();

  return {
    authController: buildAuthComposition({ uuidGenerator }),
    accountController: buildAccountComposition({ uuidGenerator }),
    categoryController: buildCategoryComposition({ uuidGenerator }),
    tagController: buildTagComposition({ uuidGenerator }),
    transactionController: buildTransactionComposition({ uuidGenerator }),
  };
};

export type Container = ReturnType<typeof buildContainer>;

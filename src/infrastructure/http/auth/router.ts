import { Hono } from "hono";
import AuthController from "./auth.controller";
import { LoginSchema } from "../schemas/auth/login.schema";
import { RegisterSchema } from "../schemas/auth/register.schema";
import { schemaValidator } from "../middlewares/schema-validator.middleware";
import { UserDatasourceImpl } from "../../datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../repositories/user.repository.impl";
import { BycriptPasswordHasher } from "../../adapters/bycriptPasswordHasher";
import { jwtTokenGenerator } from "../../adapters/jwtTokenGenerator";
import { LoginUseCase } from "../../../application/useCases/auth/login.use-case";
import { RegisterUseCase } from "../../../application/useCases/auth/register.use-case";

export const AuthRouter = new Hono();

const datasource = new UserDatasourceImpl();
const repository = new UserRepositoryImpl(datasource);
const passwordHasher = new BycriptPasswordHasher();

const loginUseCase = new LoginUseCase(
  repository,
  passwordHasher,
  jwtTokenGenerator,
);
const registerUseCase = new RegisterUseCase(
  repository,
  passwordHasher,
  jwtTokenGenerator,
);

const authController = new AuthController(loginUseCase, registerUseCase);

AuthRouter.post(
  "/login",
  schemaValidator("json", LoginSchema),
  authController.login,
);

AuthRouter.post(
  "/register",
  schemaValidator("json", RegisterSchema),
  authController.register,
);

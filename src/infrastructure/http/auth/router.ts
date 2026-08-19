import { Hono } from "hono";
import AuthController from "./authController";
import { LoginSchema } from "../schemas/auth/login.schema";
import { RegisterSchema } from "../schemas/auth/register.schema";
import { schemaValidator } from "../middlewares/schemaValidator";
import { UserDatasourceImpl } from "../../datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../repositories/user.repository.impl";
import { BycriptPasswordHasher } from "../../adapters/bycriptPasswordHasher";
import { JwtTokenGenerator } from "../../adapters/jwtTokenGenerator";
import { LoginUseCase } from "../../../application/useCases/auth/login.useCase";
import { RegisterUseCase } from "../../../application/useCases/auth/register.useCase";

export const AuthRouter = new Hono();

const datasource = new UserDatasourceImpl();
const repository = new UserRepositoryImpl(datasource);
const passwordHasher = new BycriptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator();

const loginUseCase = new LoginUseCase(
  repository,
  passwordHasher,
  tokenGenerator,
);
const registerUseCase = new RegisterUseCase(
  repository,
  passwordHasher,
  tokenGenerator,
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

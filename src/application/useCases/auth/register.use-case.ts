import type { IdGenerator } from "@/application/ports/idGenerator";
import { UserEntity } from "../../../domain/entities/user.entity";
import type { UserRepository } from "../../../domain/repositories/user.repository";
import type { PasswordHasher } from "../../ports/passwordHasher";
import type { TokenGenerator } from "../../ports/tokenGenerator";
import type { LoginResponseDTO } from "../../dtos/auth/loginResponse.dto";
import type { RegisterDTO } from "../../dtos/auth/register.dto";

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(dto: RegisterDTO): Promise<LoginResponseDTO> {
    const existing = await this.userRepository
      .getByEmail(dto.email)
      .catch(() => null);

    if (existing) throw new Error("Email already in use");

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    const user = new UserEntity(
      this.idGenerator.generate(),
      dto.email,
      hashedPassword,
      dto.name,
      "",
    );

    const created = await this.userRepository.create(user);

    const token = this.tokenGenerator.generate(created.id, created.email);

    return {
      user: {
        id: created.id,
        email: created.email,
        name: created.name,
      },
      token,
    };
  }
}

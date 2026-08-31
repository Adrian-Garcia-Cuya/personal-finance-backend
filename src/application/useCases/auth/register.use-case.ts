import type { UserRepository } from "../../../domain/repositories/user.repository";
import type { PasswordHasher } from "../../../domain/ports/passwordHasher";
import type { TokenGenerator } from "../../../infrastructure/ports/tokenGenerator";
import type { LoginResponseDTO } from "../../dtos/auth/loginResponse.dto";
import type { RegisterDTO } from "../../dtos/auth/register.dto";

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async execute(dto: RegisterDTO): Promise<LoginResponseDTO> {
    const existing = await this.userRepository
      .getByEmail(dto.email)
      .catch(() => null);

    if (existing) throw new Error("Email already in use");

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    const user = await this.userRepository.create(
      dto.name,
      dto.email,
      hashedPassword,
    );

    const token = this.tokenGenerator.generate(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}

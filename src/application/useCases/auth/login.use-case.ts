import type { TokenGenerator } from "@/application/ports/tokenGenerator";
import type { UserRepository } from "../../../domain/repositories/user.repository";
import type { BycriptPasswordHasher } from "../../../infrastructure/adapters/bycriptPasswordHasher";
import type { LoginResponseDTO } from "../../dtos/auth/loginResponse.dto";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bycriptPasswordHasher: BycriptPasswordHasher,
    private readonly jwtTokenGenerator: TokenGenerator,
  ) {}

  async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponseDTO> {
    const user = await this.userRepository.getByEmail(email);

    const isValid = await this.bycriptPasswordHasher.compare(
      password,
      user.password,
    );
    if (!isValid) throw new Error("Invalid credentials");

    const token = this.jwtTokenGenerator.generate(user.id, user.email);

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

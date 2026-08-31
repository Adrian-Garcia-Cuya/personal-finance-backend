import type { CreateAccountDTO } from "@/domain/dtos/account/create-account.dto";
import type { AccountRepository } from "@/domain/repositories";

export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(data: CreateAccountDTO) {
    await this.accountRepository.create(data);

    return {
      success: true,
      message: "Account created successfully",
    };
  }
}

import type { AccountRepository } from "@/domain/repositories";

export class GetAllAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(userId: string) {
    return await this.accountRepository.findAll(userId);
  }
}

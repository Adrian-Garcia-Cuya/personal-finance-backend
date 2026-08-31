import type { RegistrationFormDataDTO } from "@/application/dtos/transaction/registration-form.dto";
import type {
  AccountRepository,
  CategoryRepository,
  TagRepository,
} from "@/domain/repositories";

export class GetRegistrationFormUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly accountRepository: AccountRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(userId: number): Promise<RegistrationFormDataDTO> {
    const [categories, accounts, tags] = await Promise.all([
      this.categoryRepository.findAll(userId),
      this.accountRepository.findAll(userId),
      this.tagRepository.findAll(userId),
    ]);

    return { categories, accounts, tags };
  }
}

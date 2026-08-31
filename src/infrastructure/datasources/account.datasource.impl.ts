import { prisma } from "../database/prisma";
import type { AccountType } from "@generated/prisma/enums";

import type { CreateAccountDTO } from "@domain/dtos";
import type { AccountDatasource } from "@domain/datasources";
import { AccountEntity } from "@domain/entities";

export class AccountDatasourceImpl implements AccountDatasource {
  async create(createAccountDto: CreateAccountDTO): Promise<AccountEntity> {
    const { accountType, ...rest } = createAccountDto;
    const account = await prisma.account.create({
      data: {
        ...rest,
        accountType: accountType as unknown as AccountType,
      },
    });

    return AccountEntity.fromObject(account);
  }

  async findAll(userId: number): Promise<AccountEntity[]> {
    const accounts = await prisma.account.findMany({
      where: {
        status: true,
        deletedAt: null,
        userId: userId,
      },
    });

    return accounts.map((account) => AccountEntity.fromObject(account));
  }
}

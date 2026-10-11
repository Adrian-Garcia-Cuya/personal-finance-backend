import { prisma } from "../database/prisma";
import type { AccountType } from "@generated/prisma/enums";

import type { AccountDatasource } from "@domain/datasources";
import { AccountEntity } from "@domain/entities";

export class AccountDatasourceImpl implements AccountDatasource {
  async create(account: AccountEntity): Promise<AccountEntity> {
    const created = await prisma.account.create({
      data: {
        id: account.id,
        userId: account.userId,
        name: account.name,
        accountType: account.accountType as unknown as AccountType,
        initialBalance: account.initialBalance,
        icon: account.icon,
        description: account.description,
        color: account.color,
        status: account.status,
      },
    });

    return AccountEntity.fromObject(created);
  }

  async findAll(userId: string): Promise<AccountEntity[]> {
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

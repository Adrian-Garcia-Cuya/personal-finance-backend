import { prisma } from "../database/prisma";

import type { AccountDatasource } from "@domain/datasources";
import { AccountEntity } from "@domain/entities";

export class AccountDatasourceImpl implements AccountDatasource {
  async create(account: AccountEntity): Promise<AccountEntity> {
    await prisma.account.create({
      data: account.toPersistence(),
    });

    return account;
  }

  async findAll(userId: string): Promise<AccountEntity[]> {
    const accounts = await prisma.account.findMany({
      where: {
        status: true,
        deletedAt: null,
        userId: userId,
      },
    });

    return accounts.map(
      (account) =>
        new AccountEntity(
          account.id,
          account.userId,
          account.name,
          account.accountType,
          account.initialBalance.toNumber(),
          account.icon,
          account.status,
          account.description,
          account.color,
        ),
    );
  }
}

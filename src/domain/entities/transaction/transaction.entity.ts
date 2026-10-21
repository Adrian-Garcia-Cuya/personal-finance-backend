import type { TransactionType } from "./types";
import type { TagId } from "./valueObjects/tagId.value-object";

interface TransactionProps {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
  tagIds?: TagId[];
  categoryId?: string | null;
  toAccountId?: string | null;
  description?: string | null;
}

export class TransactionEntity {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly accountId: string,
    readonly amount: number,
    readonly type: TransactionType,
    readonly transactionDate: Date,
    private readonly tagIds: TagId[],
    readonly categoryId?: string | null,
    readonly toAccountId?: string | null,
    readonly description?: string | null,
  ) {}

  static create(props: TransactionProps) {
    return new TransactionEntity(
      props.id,
      props.userId,
      props.accountId,
      props.amount,
      props.type,
      props.transactionDate,
      props.tagIds ?? [],
      props.categoryId ?? null,
      props.toAccountId ?? null,
      props.description ?? null,
    );
  }

  getTagIds(): TagId[] {
    return [...this.tagIds];
  }
}

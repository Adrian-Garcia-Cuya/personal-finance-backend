export enum CategoryType {
  INCOME = "income",
  EXPENSE = "expense",
}

export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: CategoryType,
    public readonly icon: string,
    public readonly status: boolean,
    public readonly userId?: string | null,
    public readonly parentId?: string | null,
    public readonly description?: string | null,
    public readonly color?: string | null,
  ) {}

  static fromObject(object: { [key: string]: any }): CategoryEntity {
    return new CategoryEntity(
      object.id,
      object.name,
      object.type,
      object.icon,
      object.status,
      object.userId,
      object.parentId,
      object.description,
      object.color,
    );
  }
}

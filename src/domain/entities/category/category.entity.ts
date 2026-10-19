import type { CategoryType } from "./types";

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

  toPersistence() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      icon: this.icon,
      status: this.status,
      userId: this.userId ?? null,
      parentId: this.parentId ?? null,
      description: this.description ?? null,
      color: this.color ?? null,
    };
  }
}

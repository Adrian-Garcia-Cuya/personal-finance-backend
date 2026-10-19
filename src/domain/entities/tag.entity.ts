export class TagEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly name: string,
    public readonly status: boolean,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      userId: this.userId ?? null,
      name: this.name,
      status: this.status,
    };
  }
}

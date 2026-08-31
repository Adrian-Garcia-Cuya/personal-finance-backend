export class TagEntity {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly name: string,
    public readonly status: boolean,
  ) {}
  static fromObject(object: { [key: string]: any }): TagEntity {
    return new TagEntity(object.id, object.userId, object.name, object.status);
  }
}

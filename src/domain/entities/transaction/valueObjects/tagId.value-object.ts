export class TagId {
  private constructor(readonly value: string) {}

  static create(value: string): TagId {
    return new TagId(value);
  }
}

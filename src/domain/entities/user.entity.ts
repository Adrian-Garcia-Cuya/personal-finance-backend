export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly lastName: string,
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    return new UserEntity(
      object.id,
      object.email,
      object.password,
      object.name,
      object.lastName,
    );
  }
}

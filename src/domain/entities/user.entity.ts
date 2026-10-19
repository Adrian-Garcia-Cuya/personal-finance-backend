export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly lastName: string | null,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      lastName: this.lastName ?? null,
    };
  }
}

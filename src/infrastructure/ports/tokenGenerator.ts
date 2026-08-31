export interface TokenGenerator {
  generate(userId: string, email: string): string;
  verify(token: string): string;
}

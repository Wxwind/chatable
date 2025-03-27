import * as bcrypt from 'bcrypt';

export class CryptoUtils {
  static async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  static async compare(value: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(value, encrypted);
  }
}

import bcrypt from 'bcrypt'
import { Encrypter } from '../../protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12)
    return hash
  }
}

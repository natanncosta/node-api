import bcrypt from 'bcrypt'
import { Encrypter } from '../../protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    await bcrypt.hash(password, 12)
    return await new Promise(resolve => resolve(null))
  }
}

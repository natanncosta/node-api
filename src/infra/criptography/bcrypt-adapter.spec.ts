import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
function makeSut (): BcryptAdapter {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(hashSpy).toHaveBeenCalledWith('any_password', 12)
  })

  test('should return an hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_password')
    expect(hash).toBe('hash')
  })

  test('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    jest.spyOn(bcrypt, 'hash').mockReturnValue((new Promise((resolve, reject) => reject(new Error())) as unknown) as void)
    const promise = sut.encrypt('any_password')
    await expect(promise).rejects.toThrow()
  })
})

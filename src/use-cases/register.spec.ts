import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-remository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Renderer', () => {
  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'sala@gmail.com',
      name: 'sala',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'sala@gmail.com',
      name: 'sala',
      password: '123',
    })

    const isPasswordCorrectlyHashed = await compare('123', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'sala@gmail.com'

    await sut.execute({
      email,
      name: 'name',
      password: '123',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'name',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

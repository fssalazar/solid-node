import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-remository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryRepository
let sut: AuthenticateUseCase

describe('Auuthenticate User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'sala@gmail.com',
      name: 'sala',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'sala@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'sala@gmail.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const user = await usersRepository.create({
      email: 'sala@gmail.com',
      name: 'sala',
      password_hash: await hash('123456', 6),
    })
    expect(
      async () =>
        await sut.execute({
          email: user.email,
          password: '123123',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

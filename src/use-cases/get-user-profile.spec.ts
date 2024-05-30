import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-remository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryRepository
let sut: GetUserProfileUseCase

describe('Get user profile User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get a user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'sala@gmail.com',
      name: 'sala',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('sala')
  })

  it('Should not be able to get a user profile with wrong id', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'non-existing-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

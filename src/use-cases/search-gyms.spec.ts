import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript academy',
      description: '',
      phone: '',
      latitude: -26.9046066,
      longitude: -48.666896,
    })
    await gymsRepository.create({
      title: 'Typescript academy',
      description: '',
      phone: '',
      latitude: -26.9046066,
      longitude: -48.666896,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript academy' }),
    ])
  })

  it('Should be able to fetch paginated gym search ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript academ ${i}`,
        description: '',
        phone: '',
        latitude: -26.9046066,
        longitude: -48.666896,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript academ 21' }),
      expect.objectContaining({ title: 'Javascript academ 22' }),
    ])
  })
})

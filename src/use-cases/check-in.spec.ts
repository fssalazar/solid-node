import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInError } from './errors/max-number-of-checkin-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)
    await gymsRepository.create({
      id: 'gym-id',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -26.9046066,
      longitude: -48.666896,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -26.9046066,
      userLongitude: -48.666896,
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -26.9046066,
      userLongitude: -48.666896,
    })

    expect(
      async () =>
        await sut.execute({
          userId: 'user-id',
          gymId: 'gym-id',
          userLatitude: -26.9046066,
          userLongitude: -48.666896,
        }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })

  it('Should be able to check twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -26.9046066,
      userLongitude: -48.666896,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -26.9046066,
      userLongitude: -48.666896,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-26.9064735),
      longitude: new Decimal(-48.7038231),
    })
    await expect(
      async () =>
        await sut.execute({
          userId: 'user-02',
          gymId: 'gym-id',
          userLatitude: -26.9046066,
          userLongitude: -43.666896,
        }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

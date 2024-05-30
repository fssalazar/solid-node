import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const createGymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: '213',
        phone: '19000000000',
        latitude: -26.9046066,
        longitude: -48.666896,
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})

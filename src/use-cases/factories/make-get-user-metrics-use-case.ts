import { GetUserMetricsyUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetrics() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsyUseCase(checkInsRepository)

  return useCase
}

import { FetchUserCkeckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCkeckInsHistoryUseCase(checkInsRepository)

  return useCase
}

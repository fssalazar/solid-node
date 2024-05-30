import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsyUseCaseRequest {
  userId: string
}

interface GetUserMetricsyUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsyUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsyUseCaseRequest): Promise<GetUserMetricsyUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}

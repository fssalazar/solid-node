export class LateCheckInValidateError extends Error {
  constructor() {
    super('Thhe check-in can only be validated until 20 minuts of its creation')
  }
}

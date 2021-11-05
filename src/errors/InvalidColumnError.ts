class InvalidColumnError extends Error {
  constructor(message: string, public readonly errors: InvalidColumnDetails[]) {
    super(message)
    this.name = this.constructor.name
  }
}

interface InvalidColumnDetails {
  code?: string
  category?: string
  severity?: string
  description?: string
  message?: string
  start: number
  length: number
  end: number
}

export { InvalidColumnError, InvalidColumnDetails }

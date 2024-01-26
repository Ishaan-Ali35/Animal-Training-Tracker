export class ServerError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ServerError'
    this.statusCode = 500 //Because it is a server error.
  }
}

export class UserError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserError'
    this.statusCode = 400 //Because it is a user error.
  }
}

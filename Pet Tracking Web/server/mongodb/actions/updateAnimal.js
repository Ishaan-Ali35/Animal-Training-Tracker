import connectDB from '../index'
import Animal from '../models/Animal.js'
import { ServerError, UserError } from '../../utils/errors.js'

export default async function updateAnimal (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to the database.')
  }

  try {
    const { name, hoursTrained } = data
    if (name === undefined) {
      throw new UserError('Invalid name.')
    } else if (hoursTrained === undefined) {
      throw new UserError('Invalid number of hours trained.')
    }

    const updateAnimal = Animal.findByIdAndUpdate(name, {
      hoursTrained: hoursTrained
    })
    if (updateAnimal === null) {
      throw new UserError('Animal was not found.')
    }
  } catch (e) {
    if (e.statusCode === 400) {
      throw new UserError('Invalid information.')
    } else {
      

      throw new ServerError('Server Failure.')
    }
  }
}

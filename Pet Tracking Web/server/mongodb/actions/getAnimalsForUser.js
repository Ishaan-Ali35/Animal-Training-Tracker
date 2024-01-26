import connectDB from '../index'
import Animal from '../models/Animal.js'
import { ServerError, UserError } from '../../utils/errors.js'
export default async function getAnimalsForUser (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to the database.')
  }
  if (data.user === undefined) {
    throw new UserError('Please make sure to pass in a userID')
  }
  try {
    const { user } = data
    const animalList = await Animal.find({ owner: user })
    return animalList
  } catch (e) {
    throw new ServerError('Server Failure.')
  }
}

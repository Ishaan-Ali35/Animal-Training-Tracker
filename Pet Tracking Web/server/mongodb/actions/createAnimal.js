import connectDB from '../index'
import Animal from '../models/Animal.js'
import { ServerError, UserError } from '../../utils/errors.js'
import mongoose from 'mongoose'
import User from '../models/User'
export default async function createAnimal (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to the database.')
  }

  try {
    //Check and ensure that user exists in the database.
    const { owner } = data
    if (owner === undefined) {
      throw new UserError('No user id given.')
    }
    const userModel = await User.findById(owner)
    if (userModel === null) {
      throw new UserError('Given user does not exist in database.')
    }
    const animal = new Animal(data)
    await animal.save()
    return true
  } catch (e) {
    if (
      e instanceof mongoose.Error.ValidationError ||
      e instanceof mongoose.Error.CastError
    ) {
      throw new UserError('Invalid or not enough information provided.')
    } else if (e instanceof UserError || e instanceof ServerError) {
      throw e
    } else {
      

      throw new ServerError('Failed to save Animal in database.')
    }
  }
}

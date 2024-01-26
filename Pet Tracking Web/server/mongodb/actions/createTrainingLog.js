import connectDB from '../index.js'
import TrainingLog from '../models/TrainingLog.js'
import { ServerError, UserError } from '../../utils/errors.js'
import User from '../models/User.js'
import Animal from '../models/Animal.js'
import getAnimals from './getAnimals.js'
import mongoose from 'mongoose'
export default async function createTrainingLog (log) {
  try {
    connectDB()
  } catch (e) {
    

    throw new ServerError('Failed to connect to Database.')
  }
  //Check and ensure that the user and animal exist in the database, as well as ensure the animal is the users animal.

  const { user, animal } = log
  if (user === undefined || animal === undefined) {
    throw new UserError('No user or animal identifier passed into the data.')
  }
  //Check here if the animal exists or not

  const potentialAnimal = await Animal.findById(animal)

  if (potentialAnimal === null) {
    throw new UserError("Animal specified in training log doesn't exist.")
  }

  const potentialOwner = await User.findById(user)
  //Check here if potentialOwner is null, if it is throw an error
  if (potentialOwner === null) {
    throw new UserError('User specified does not exist.')
  }

  if (!potentialOwner._id.equals(potentialAnimal.owner)) {
    //Is this how I access the object ID
    throw new UserError('Specified user does not own this animal.')
  }

  let trainingLog
  try {
    trainingLog = new TrainingLog(log)
    await trainingLog.save()
  } catch (e) {
    if (
      e instanceof mongoose.Error.ValidationError ||
      e instanceof mongoose.Error.CastError
    ) {
      throw new UserError('Invalid or not enough information provided.')
    } else {
      throw new ServerError('Failed to save traininglog in database.')
    }
  }

  const newHours = potentialAnimal.hoursTrained + trainingLog.hours

  await Animal.findByIdAndUpdate(animal, { hoursTrained: newHours })

  //Check and ensure that the animal is the users.
}

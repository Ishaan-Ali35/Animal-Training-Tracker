import TrainingLog from '../models/TrainingLog'

import connectDB from '../index.js'

import { ServerError, UserError } from '../../utils/errors'
import Animal from '../models/Animal'

export default async function deleteTrainingLog (identifier) {
  try {
    connectDB()
  } catch {
    throw new ServerError('Failed to connect to Database.')
  }
  //Below case should not happen, but just included it to be sure
  if (identifier === undefined) {
    //No parameter given.
    throw new UserError('No Training Log Identifier given.')
  }
  //Checking if the identifier is null
  let deletedTrainingLog
  try {
    deletedTrainingLog = await TrainingLog.findByIdAndDelete(identifier)
  } catch (e) {
    

    throw new UserError('Invalid Identifier given.')
  }

  if (deletedTrainingLog === null) {
    throw new UserError('No Training Log exists with such an identifier.')
  }
  //If we get here than the trainingLog did indeed get deleted.
  const animalID = deletedTrainingLog.animal
  const hours = deletedTrainingLog.hours
  

  

  const animal = await Animal.findById(animalID)
  await Animal.findByIdAndUpdate(animalID, {
    hoursTrained: animal.hoursTrained - hours
  })
}

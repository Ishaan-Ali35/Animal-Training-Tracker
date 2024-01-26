import TrainingLog from '../models/TrainingLog'
import { ServerError, UserError } from '../../utils/errors'
import connectDB from '..'
import Animal from '../models/Animal'
export default async function updateTrainingLog (data) {
  //Pass in an object containing the identifier of the trainingLog you wish to update, passed in as "identifier", as well as other parameters I wish to alter.
  try {
    connectDB()
  } catch (e) {
    

    throw new ServerError('Failed to connect to Database.')
  }
  //Check if data is passed
  if (data === undefined || data === null) {
    throw new UserError('No information passed.')
  }
  let oldLog
  try {
    const { identifier } = data
    delete data.identifier

    oldLog = await TrainingLog.findByIdAndUpdate(identifier, data)
    if (hours in data) {
      //Change hours in trainingLog
      //Assume the animal id is correct.
      const animal = await Animal.findById(oldLog.animal)
      const newHours = animal.hoursTrained - oldLog.hours + data.hours
      await Animal.findByIdAndUpdate(oldLog.animal, { hoursTrained: newHours })
    }
  } catch {
    throw new UserError('Incorrect or Insufficient information passed.')
  }
  if (oldLog === null) {
    throw new UserError('No such Training Log exists.')
  }
}

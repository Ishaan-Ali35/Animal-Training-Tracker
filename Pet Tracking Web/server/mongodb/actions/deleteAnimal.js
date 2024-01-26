import connectDB from '../index'
import Animal from '../models/Animal.js'
import { ServerError, UserError } from '../../utils/errors.js'
import TrainingLog from '../models/TrainingLog'
import deleteTrainingLog from './deleteTrainingLog'
import mongoose from 'mongoose'
export default async function deleteAnimal (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to the database.')
  }
  let identifier
  try {
    identifier = data
    if (identifier === undefined) {
      throw new UserError('Invalid information.')
    }

    let results = await TrainingLog.find({ animal: identifier })

    //Need to use for (of) loop with await instead of forEach, that doesn't properly waits.
    for await (const result of results) {
      await deleteTrainingLog(result.id)
    }
    const deletedAnimal = await Animal.findByIdAndDelete(identifier)
    if (deletedAnimal === null) {
      throw new UserError('Animal was not found.')
    }
  } catch (e) {
    if (e.statusCode === 400) {
      throw e
    } else {
      

      throw new ServerError('Server Failure.')
    }
  }
  //If we get here that means that we have succesfully deleted an animal. We now have to delete trainingLogs associated with such an Animal.
  //First findAll the id's of trainingLogs associated with this animal. Then call the delete action.
}

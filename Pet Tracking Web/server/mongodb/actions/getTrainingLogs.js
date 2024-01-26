import TrainingLog from '../models/TrainingLog'
import connectDB from '../index'
import { ServerError, UserError } from '../../utils/errors'
export default async function getTrainingLogs (data) {
  try {
    connectDB()
  } catch {
    throw new ServerError('Failed to connect to database')
  }
  try {
    const { pageSize, lastObjectId } = data
    let cursor = {}
    

    if (lastObjectId) {
      //If pageSize is null or undefined it should just do no limits
      //Sorts in ascending order

      cursor = await TrainingLog.find({ _id: { $gt: lastObjectId } })
        .sort({ _id: 1 })
        .limit(pageSize) //Gt or lt?
    } else {
      cursor = await TrainingLog.find().sort({ _id: 1 }).limit(pageSize)
    }

    return cursor
  } catch (e) {
    

    throw new UserError('Incorrect parameters passed in.')
  }
}

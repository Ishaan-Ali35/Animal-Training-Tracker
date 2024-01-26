import User from '../models/User'
import Animal from '../models/Animal'
import { ServerError, UserError } from '../../utils/errors'
import connectDB from '..'
export default async function getInfo (data) {
  try {
    await connectDB()
  } catch (e) {
    

    throw new ServerError('Failed to connect to the database.')
  }
  try {
    const { user, animal } = data
    if (user === undefined || animal === undefined) {
      throw new UserError('Improper Input Given')
    }
    const userInfo = await User.findById(user)
    const animalInfo = await Animal.findById(animal)

    const returnVal = {
      username: userInfo.fullName,
      animalname: animalInfo.name,
      breed: animalInfo.breed,
      hoursTrained: animalInfo.hoursTrained,
      profilePicture: animalInfo.profilePicture
    }

    return returnVal
  } catch (e) {
    

    if (!e instanceof UserError) {
      throw ServerError('Server Error occurred.')
    } else {
      throw e
    }
  }
}

import connectDB from '../index'
import User from '../models/User'
import { ServerError, UserError } from '../../utils/errors'
import bcrypt from 'bcrypt'
const SALT_COUNT = 1
export default async function verifyUser (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to database')
  }

  try {
    const user = await User.findOne({ email: data.email })
    const existingHash = user.password
    const match = await bcrypt.compare(data.password, existingHash)

    if (match) {
      return user
    } else {
      throw new ServerError('Invalid/insufficient information')
    }
  } catch (e) {
    throw new ServerError('Invalid/insufficient information')
  }
}

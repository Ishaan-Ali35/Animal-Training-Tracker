import connectDB from '../index'
import User from '../models/User'
import { ServerError, UserError } from '../../utils/errors'
import bcrypt from 'bcrypt'
const SALT_COUNT = 1
export default async function createUser (data) {
  try {
    await connectDB()
  } catch (e) {
    throw new ServerError('Failed to connect to database')
  }

  try {
    const exists = await User.exists({ email: data['email'] })
    if (exists === null) {
      data.password = await bcrypt.hash(data.password, SALT_COUNT) //10 is the number of saltrounds.
      const user = new User(data)
      await user.save()
      return user
    } else {
      throw new UserError('Email already exists')
    }
  } catch (e) {
    if ((e._message === 'User validation failed') | (e.name === 'CastError')) {
      throw new UserError('Invalid/insufficient information')
    } else if (e.message === 'Email already exists') {
      throw new UserError('Email already exists')
    } else {
      throw new ServerError('Server Failure')
    }
  }
}

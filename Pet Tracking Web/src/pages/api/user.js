import createUser from '../../../server/mongodb/actions/createUser'
import deleteUser from '../../../server/mongodb/actions/deleteUser'
import jwt from 'jsonwebtoken'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const body = req.body
    try {
      const ret = await createUser(body)
      const secret = process.env.JWT_SECRET || ''
      const token = await jwt.sign({ ret }, secret)
      return res.status(200).json({ success: true, message: ret, token: token })
    } catch (e) {
      return res
        .status(e.statusCode)
        .json({ success: false, message: e.message })
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteUser(req.query.identifier)
      return res.status(200).json({ success: true })
    } catch (e) {
      return res
        .status(e.statusCode)
        .json({ success: false, message: e.message })
    }
  }
}

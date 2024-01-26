import verifyUser from '@/../server/mongodb/actions/verifyUser'
import jwt from 'jsonwebtoken'

const MAX_AGE = 60 * 60 // 1 hour

export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body
      const ret = await verifyUser(body)
      const { userId, username, email, password, admin } = ret

      const secret = process.env.JWT_SECRET || ''
      const token = await jwt.sign({ ret }, secret)

      return res.status(200).json({ success: true, message: ret, token: token })
    } catch (e) {
      

      

      return res
        .status(e.statusCode)
        .json({ success: false, message: e.message })
    }
  }
}

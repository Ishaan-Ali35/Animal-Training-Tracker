import getUsers from '../../../../server/mongodb/actions/getUsers'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    try {
      return res.status(200).send(await getUsers(req.query))
    } catch (E) {
      return res.status(e.statusCode).send(e.message)
    }
  }
}

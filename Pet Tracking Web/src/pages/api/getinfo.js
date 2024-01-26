import getInfo from '../../../server/mongodb/actions/getInfo'
export default async function handler (req, res) {
  if (req.method === 'GET') {
    try {
      const data = await getInfo(req.query)

      res.status(200).json(data)
    } catch (e) {
      res.status(e.statusCode).send(e.message)
    }
  } else {
    res
      .status(400)
      .send('Only GET query method available at this API endpoint.')
  }
}

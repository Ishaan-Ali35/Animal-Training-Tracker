import getTrainingLogs from '../../../../server/mongodb/actions/getTrainingLogs'
export default async function handler (req, res) {
  if (req.method === 'GET') {
    try {
      const results = await getTrainingLogs(req.query)
      res.status(200).json(results)
    } catch (e) {
      res.status(e.statusCode).send(e.message)
    }
  } else {
    res.status(400).send('Only GET query method available at this endpoint.')
  }
}

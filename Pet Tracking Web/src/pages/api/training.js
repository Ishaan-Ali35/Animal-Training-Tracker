import createTrainingLog from '../../../server/mongodb/actions/createTrainingLog'
import updateTrainingLog from '../../../server/mongodb/actions/updateTrainingLog'
import deleteTrainingLog from '../../../server/mongodb/actions/deleteTrainingLog'
export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      await createTrainingLog(req.body)
    } catch (e) {
      

      res.status(e.statusCode).send(e.message)
    }
    res.status(200).send('Success')
  } else if (req.method === 'PATCH') {
    try {
      await updateTrainingLog(req.body)
    } catch (e) {
      

      res.status(e.statusCode).send(e.message)
    }
    res.status(200).send('Success')
  } else if (req.method === 'DELETE') {
    try {
      await deleteTrainingLog(req.query.identifier)
    } catch (e) {
      

      res.status(e.statusCode).send(e.message)
    }
    res.status(200).send('Success')
  } else {
    res
      .status(400)
      .send(
        'Only POST,PATCH, or DELETE query methods available at this API endpoint.'
      )
  }
}

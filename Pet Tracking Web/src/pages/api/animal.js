import createAnimal from '../../../server/mongodb/actions/createAnimal'
import updateAnimal from '../../../server/mongodb/actions/updateAnimal'
import deleteAnimal from '../../../server/mongodb/actions/deleteAnimal'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      await createAnimal(req.body)
      return res.status(200).send('Success')
    } catch (e) {
      return res.status(e.statusCode).send(e.message)
    }
  }

  if (req.method === 'PATCH') {
    try {
      await updateAnimal(req.body)
      return res.status(200).send('Success')
    } catch (e) {
      return res.status(e.statusCode).send(e.message)
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deleteAnimal(req.query.identifier)
      return res.status(200).send('Success')
    } catch (e) {
      return res.status(e.statusCode).send(e.message)
    }
  } else {
    return res
      .status(400)
      .send(
        'Please only use POST, PATCH, and DELETE queries at this API endpoint.'
      )
  }
}

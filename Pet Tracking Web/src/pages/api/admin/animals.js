import getAnimals from '../../../../server/mongodb/actions/getAnimals.js'
export default async function handler (req, res) {
  if (req.method === 'GET') {
    try {
      const animals = await getAnimals(req.query)
      res.status(200).json(animals)
    } catch (e) {
      res.status(e.statusCode).send(e.message)
    }
  } else {
    res.status(400).send('Incorrect query method. Method must be GET')
  }
}

import styles from '@/styles/LogCreation.module.css'
import { useState, useEffect } from 'react'
import moment from 'moment'
//Create API endpoint that gets all animals assosciated with a user.
//For now, the way it is implemented, a user can only create a log
//associated with itself, even if it is admin, it can only delete any traininglog,
//But can't edit user assosciated with such a training log.
//Create an ERROR state that shows if it is not "", and shows an error message
//right above the submit button.

export default function TrainingLogCreation (props) {
  const { setCreate } = props
  const user = props.userId
  //Temporary current user id.
  //Get current date from moment
  const currentMonth = moment().format('M')
  const currentYear = moment().format('YYYY')
  const currentDay = moment().format('D')
  const [animalSelections, setAnimalSelections] = useState([])
  const [errorMessage, setErrorMessage] = useState(' ')

  async function saveLog (title, animal, hours, month, day, year, note) {
    //Below ensures all input boxes are ch
    if (
      title === '' ||
      hours === '' ||
      day === '' ||
      year === '' ||
      note === ''
    ) {
      setErrorMessage('One or more entries is empty.')
      return
    }
    if (day < 0 || year < 0 || hours < 0) {
      setErrorMessage('One or more entries is negative.')
      return
    }
    let myMoment = 0
    try {
      myMoment = moment({ year, month, day })
    } catch (e) {
      setErrorMessage(e.message)
      return
    }
    if (!myMoment.isValid()) {
      setErrorMessage("Invalid date given.")
      return
    }
    let date = myMoment.toISOString()

    const URL = `/api/training`

    const data = {
      title: title,
      user: user,
      animal: animal,
      date: date,
      description: note,
      hours: hours
    }
    await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    //Create traininglog now.
    setErrorMessage(' ')
    setCreate(false)
    //Create animal selection criteria
  }
  function cancel () {
    setCreate(false)
  }
  useEffect(() => {
    async function createAnimalSelections (user) {
      const URL = `/api/animalsforuser?user=${user}`

      const response = await fetch(URL)

      const animals = await response.json()
      const animalSelectionsList = []

      animals.forEach(animal => {
        animalSelectionsList.push([animal._id, animal.name, animal.breed])
      })

      setAnimalSelections(animalSelectionsList)
    }

    createAnimalSelections(user)
  }, [])

  return (
    <div className={styles.form}>
      <label className={styles.button}>
        Title
        <input
          type='text'
          id='title'
          className={styles.input}
          placeholder='Title'
        />
      </label>
      {/* Put selection for dog here, will need to put code elsewhere as well. */}
      <label className={styles.button}>
        Select Animal
        <select id='animal' className={styles.input}>
          {animalSelections.map(animal => {
            return (
              <option key={animal[0]} value={animal[0]}>
                {animal[1]} - {animal[2]}
              </option>
            )
          })}
        </select>
      </label>
      <label className={styles.button}>
        Total Hours Trained
        <input
          type='number'
          id='hours'
          className={styles.input}
          placeholder='Hours'
          min='0'
        />
      </label>
      <div className={styles.date}>
        <label className={styles.button}>
          Month
          <select
            id='month'
            name='month'
            defaultValue={currentMonth - 1}
            className={styles.input}
          >
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value='11'>December</option>
          </select>
        </label>
        <div>        </div>
        <label className={styles.button}>
          Day
          <input
            type='number'
            id='day'
            defaultValue={currentDay}
            className={styles.input}
            placeholder='Day'
            min='0'
          />
        </label>
        <div>        </div>
        <label className={styles.button}>
          Year
          <input
            type='number'
            id='year'
            defaultValue={currentYear}
            className={styles.input}
            placeholder='Year'
            min='0'
          />
        </label>
      </div>
      <label className={styles.button}>
        Note
        <textarea id='note' className={styles.note} placeholder='Note' />
      </label>
      <div>{errorMessage}</div>
      <div className={styles.buttons} id='save'>
        <button onClick={cancel} id='cancel' className={styles.cancelButton}>
          Cancel
        </button>
        <button
          className={styles.saveButton}
          onClick={() => {
            saveLog(
              document.getElementById('title')?.value,
              document.getElementById('animal')?.value,
              document.getElementById('hours')?.value,
              document.getElementById('month')?.value,
              document.getElementById('day')?.value,
              document.getElementById('year')?.value,
              document.getElementById('note')?.value
            )
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

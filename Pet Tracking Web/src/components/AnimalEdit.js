import styles from '@/styles/LogCreation.module.css'
import { useState, useEffect } from 'react'
import moment from 'moment'
//Create API endpoint that gets all animals assosciated with a user.
//For now, the way it is implemented, a user can only create a log
//associated with itself, even if it is admin, it can only delete any traininglog,
//But can't edit user assosciated with such a training log.
//Create an ERROR state that shows if it is not "", and shows an error message
//right above the submit button.
//Currently edit doesn't work when you are an admin.

export default function TrainingLogEdit (props) {
  let { setEdit, edit } = props
  const user = props.userId
  //Temporary current user id.
  //Deconstruct day value here.
  

  const day = moment(edit.date).format('D')
  const year = moment(edit.date).format('YYYY')
  const month = moment(edit.date).format('MM') - 1

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
    let date = myMoment.toISOString()

    const URL = `/api/training`

    const data = {
      title: title,
      user: user,
      animal: animal,
      date: date,
      description: note,
      hours: hours,
      identifier: edit._id
    }
    

    await fetch(URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    //Create traininglog now.
    setErrorMessage(' ')
    setEdit(false)
    //Create animal selection criteria
  }
  function cancel () {
    setEdit(false)
  }
  async function deleteLog () {
    const URL = `/api/training/?identifier=${edit._id}`
    await fetch(URL, { method: 'DELETE' })
    setEdit(false)
  }
  useEffect(() => {
    async function createAnimalSelections (user) {
      const URL = `/api/animalsforuser?user=${user}`

      const response = await fetch(URL)

      const animals = await response.json()
      let animalSelectionsList = []

      animals.forEach(animal => {
        if (animal._id === edit.animal) {
          animalSelectionsList = [
            [animal._id, animal.name, animal.breed],
            ...animalSelectionsList
          ]
        } else {
          animalSelectionsList.push([animal._id, animal.name, animal.breed])
        }
      })

      setAnimalSelections(animalSelectionsList)
    }

    createAnimalSelections(user)
  }, [])

  return (
    <>
      <label>
        Title
        <input
          type='text'
          id='title'
          defaultValue={edit.title}
          className={styles.input}
          placeholder='Title'
        />
      </label>
      {/* Put selection for dog here, will need to put code elsewhere as well. */}
      <label>
        Select Animal
        <select id='animal'>
          {/* Instead of using a default value I can ensure the first value displayed is the one I want. I */}
          {animalSelections.map(animal => {
            return (
              <option key={animal[0]} value={animal[0]}>
                {animal[1]} - {animal[2]}
              </option>
            )
          })}
        </select>
      </label>
      <label>
        Total Hours Trained
        <input
          type='number'
          id='hours'
          defaultValue={edit.hours}
          className={styles.input}
          placeholder='Hours'
          min='0'
        />
      </label>
      <label>
        Month
        <select id='month' name='month' defaultValue={month}>
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
      <label>
        Day
        <input
          type='number'
          id='day'
          defaultValue={day}
          placeholder='Day'
          min='0'
        />
      </label>
      <label>
        Year
        <input
          type='number'
          id='year'
          defaultValue={year}
          placeholder='Year'
          min='0'
        />
      </label>
      <label>
        Note
        <input
          type='text'
          id='note'
          defaultValue={edit.description}
          className={styles.input}
          placeholder='Note'
        />
      </label>
      <div>{errorMessage}</div>
      <button
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
      <button onClick={cancel}>Cancel</button>
      <button onClick={deleteLog}>Delete</button>
    </>
  )
}

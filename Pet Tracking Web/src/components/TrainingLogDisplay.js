import styles from '@/styles/TrainingLog.module.css'
import Image from 'next/image'
import moment from 'moment'
import redpen from '@/images/redpen.png'
import { useEffect, useState } from 'react'

//Need to create an API endpoint to do all of this stuff.

export default function TrainingLogDisplay (props) {
  const { setEdit, edit, debouncedEdit, currentSearch, admin } = props
  const [username, setUsername] = useState('')
  const [animalBreed, setAnimalBreed] = useState('')
  const [animalName, setAnimalName] = useState('')

  useEffect(() => {
    //This useEffect will run when loading to set username and animal breed and animal name.
    async function getInfo (user, animal) {
      const URL = `/api/getinfo?user=${user}&animal=${animal}`

      const response = await fetch(URL)
      const data = await response.json()
      //Perhaps by the time this runs the database has not been updated yet.
      setUsername(data.username)
      setAnimalBreed(data.animalname)
      setAnimalName(data.breed)
    }
    getInfo(props.user, props.animal)
  }, [debouncedEdit])
  const day = moment(props.date).format('D')
  const monthAndYear = moment(props.date).format('MMM - YYYY')
  //Used to make it sort by all fields, now it just sorts by Title.
  //let checkString = `${props.title}${props.description}${props.hours}${day}${monthAndYear}${animalBreed}${animalName}${username}`;
  let checkString = props.title
  checkString = checkString.toLowerCase()

  if (currentSearch === '' || checkString.includes(currentSearch)) {
    return (
      <>
        <div className={styles.log}>
          <div className={styles.leftContent}>
            <div className={styles.dateStuff}>
              <div className={styles.day}>{day}</div>
              <div className={styles.otherDate}>{monthAndYear}</div>
            </div>

            <div className={styles.description}>
              <div className={styles.upperDescription}>
                <div className={styles.title}>{props.title}</div>• {props.hours}{' '}
                hours
              </div>
              <div className={styles.middleDescription}>
                {username} - {animalBreed} - {animalName}
              </div>
              <div>{props.description}</div>
            </div>
          </div>
          {admin ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setEdit(props)
              }}
              className={styles.redpen}
            >
              <Image
                src={redpen}
                alt=''
                width='50'
                className={styles.redpenimage}
              />
            </button>
          )}
        </div>
      </>
    )
  } else {
    return <></>
  }
}

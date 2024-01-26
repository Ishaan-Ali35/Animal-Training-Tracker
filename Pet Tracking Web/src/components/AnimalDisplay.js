import { useEffect, useState } from 'react'
import styles from '@/styles/Animal.module.css'

export default function Animal (props) {
  const {
    setEdit,
    edit,
    debouncedEdit,
    currentSearch,
    admin,
    deleteOccured,
    setDeleteOccured
  } = props
  const [username, setUsername] = useState('')
  const [animalBreed, setAnimalBreed] = useState('')
  const [animalName, setAnimalName] = useState('')
  const [hoursTrained, setHoursTrained] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const handleImageError = () => {
    setProfilePicture(
      'data:image/png;base64,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'
    )
  }
  useEffect(() => {
    //This useEffect will run when loading to set username and animal breed and animal name.
    async function getInfo (user, animal) {
      const URL = `/api/getinfo?user=${user}&animal=${animal}`

      const response = await fetch(URL)
      const data = await response.json()
      

      //Perhaps by the time this runs the database has not been updated yet.
      setUsername(data.username)
      

      setAnimalBreed(data.breed)
      setAnimalName(data.animalname)
      setHoursTrained(data.hoursTrained)
      setProfilePicture(data.profilePicture)
    }
    getInfo(props.owner, props._id)
  }, [debouncedEdit])
  async function deleteLog () {
    

    const URL = `/api/animal/?identifier=${props._id}`
    await fetch(URL, { method: 'DELETE' })
    

    setDeleteOccured(deleteOccured * -1)
  }
  let checkString = `${animalName}`
  checkString = checkString.toLowerCase()

  if (currentSearch === '' || checkString.includes(currentSearch)) {
    return (
      <>
        <div className={styles.animal}>
          <img
            className={styles.picture}
            src={profilePicture}
            width='350'
            height='260'
            onError={handleImageError}
          ></img>
          <div className={styles.info}>
            <div className={styles.innerInfo}>
              <div className={styles.user_logo}>
                <b className={styles.first_letter}>
                  {username.charAt(0).toUpperCase()}
                </b>
              </div>
              <div className={styles.inforight}>
                <div className={styles.animalInfo}>
                  {animalName} - {animalBreed}
                </div>
                <div className={styles.trainingInfo}>
                  {username} • Trained: {hoursTrained} hours
                </div>
              </div>
            </div>
            {deleteOccured === undefined ? (
              <></>
            ) : (
              <button onClick={deleteLog} className={styles.delete}>
                X
              </button>
            )}
          </div>
          <div></div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

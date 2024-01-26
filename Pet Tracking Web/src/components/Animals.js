import { useAuth } from '@/hooks/useAuth'
import styles from '@/styles/AnimalPage.module.css'
import { useEffect, useState } from 'react'
import Animal from '@/components/AnimalDisplay'
import Header from '@/components/Header'
import AnimalCreation from '@/components/AnimalCreation'
import useDebounce from '@/hooks/useDebounce'

export default function Animals (props) {
  const { userId, admin, username, login, logout } = useAuth()
  const { currentSearch, setCurrentSearch, create, setCreate, edit, setEdit } =
    props
  const [animals, setAnimals] = useState([])
  const [loading,setLoading] = useState(true);
  const debouncedEdit = useDebounce(edit, 400)
  const [deleteOccured, setDeleteOccured] = useState(1)
  async function getData () {
    const response = await fetch('/api/admin/animals')
    const data = await response.json()
    // setLoading(true)
    setAnimals(data)
    setLoading(false);
  }

  useEffect(() => {
    getData()
  }, [create, debouncedEdit, deleteOccured])

  return (
    <div className={styles.animalStuff}>
      <Header
        title='Animals'
        createFeature={!create}
        setCreate={setCreate}
      />
      {loading ? <div className="spinner"></div>:<></>}
      {create ? (
        <AnimalCreation setCreate={setCreate} userId={userId} />
      ) : (
        <></>
      )}
      {create || edit ? (
        <></>
      ) : (
        <div className={styles.animalList}>
          {animals.map(animal => {
            if (animal.owner === userId) {
              return (
                <Animal
                  key={animal._id}
                  setEdit={setEdit}
                  edit={edit}
                  {...animal}
                  debouncedEdit={debouncedEdit}
                  currentSearch={currentSearch}
                  deleteOccured={deleteOccured}
                  setDeleteOccured={setDeleteOccured}
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

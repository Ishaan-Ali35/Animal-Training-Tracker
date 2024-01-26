import UserCard from '@/components/UserCard'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import styles from '@/styles/AllUsers.module.css'

export default function AllUsers (props) {
  const [users, setUsers] = useState([])
  const { currentSearch } = props
  const [deleteOccured, setDeleteOccured] = useState(1)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getAllUsers () {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    }
    getAllUsers()
  }, [deleteOccured])
  return (
    <div className={styles.all_users_container}>
      <Header title='All Users' createComp={false} />
      {loading ? <div className='spinner'></div> : <></>}
      <div className={styles.user_card_container}>
        {users?.map(data => {
          return (
            <UserCard
              key={data._id}
              data={data}
              currentSearch={currentSearch}
              setDeleteOccured={setDeleteOccured}
              deleteOccured={deleteOccured}
            />
          )
        })}
      </div>
    </div>
  )
}

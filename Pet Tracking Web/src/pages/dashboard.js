import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import AllUsers from '@/components/AllUsers'
import TrainingLogs from '@/components/TrainingLogs'
import AllTrainingLogs from '@/components/AllTrainingLogs'
import Animals from '@/components/Animals'
import AllAnimals from '@/components/AllAnimals'
import { useEffect, useState } from 'react'
import styles from '@/styles/Dashboard.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function Dashboard () {
  const [currentSearch, setCurrentSearch] = useState('')
  const [selected, setSelected] = useState('traininglogs')
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { userId, admin, username, login, logout } = useAuth()
  useEffect(() => {
    setCreate(false)
    setEdit(false)
  }, [selected])
  function display () {
    if (selected === 'usersadmin') {
      return <AllUsers currentSearch={currentSearch} />
    } else if (selected === 'traininglogs') {
      return (
        <TrainingLogs
          currentSearch={currentSearch}
          create={create}
          setCreate={setCreate}
          edit={edit}
          setEdit={setEdit}
        />
      )
    } else if (selected === 'traininglogsadmin') {
      return (
        <AllTrainingLogs
          currentSearch={currentSearch}
          create={create}
          setCreate={setCreate}
          edit={edit}
          setEdit={setEdit}
        />
      )
    } else if (selected === 'animals') {
      return (
        <Animals
          currentSearch={currentSearch}
          create={create}
          setCreate={setCreate}
        />
      )
    } else {
      return <AllAnimals currentSearch={currentSearch} />
    }
  }

  useEffect(() => {
    const token = Cookies.get('auth_user')
    if (token === undefined) {
      router.push('/login')
    } else {
      login(token)
      display()
    }
  }, [selected])

  return (
    <div>
      <SearchBar setCurrentSearch={setCurrentSearch} selected={selected} />
      <div className={styles.main_page}>
        <Sidebar selected={selected} setSelected={setSelected} />
        {display()}
      </div>
    </div>
  )
}

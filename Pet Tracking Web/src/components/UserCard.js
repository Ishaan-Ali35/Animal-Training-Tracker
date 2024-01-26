import styles from '@/styles/UserCard.module.css'

export default function UserCard (props) {
  const data = props.data
  const { setDeleteOccured, deleteOccured } = props

  const currentSearch = props.currentSearch
  const tempUsername = data.fullName.toLowerCase()
  async function deleteLog () {
    const URL = `/api/user/?identifier=${data._id}`
    await fetch(URL, { method: 'DELETE' })
    

    setDeleteOccured(deleteOccured * -1)
  }
  if (tempUsername.includes(currentSearch)) {
    return (
      <div className={styles.user_info_container}>
        <div className={styles.innerContainer}>
          <div className={styles.user_logo}>
            <b className={styles.first_letter}>
              {data.fullName?.charAt(0).toUpperCase()}
            </b>
          </div>
          <div>
            <p className={styles.user_name}>
              <b>{data.fullName}</b>
            </p>
            {data.admin ? (
              <p className={styles.user_identifier}>Admin</p>
            ) : (
              <p>User</p>
            )}
          </div>
        </div>
        {data.admin ? (
          <></>
        ) : (
          <button className={styles.delete} onClick={deleteLog}>
            X
          </button>
        )}
      </div>
    )
  } else {
    return <></>
  }
}

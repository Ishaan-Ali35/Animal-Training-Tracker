import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import styles from '@/styles/Sidebar.module.css'
import Image from 'next/image'
import all_animals_icon from '@/images/all_animals_icon.png'
import all_training_icon from '@/images/all_training_icon.png'
import all_users_icon from '@/images/all_users_icon.png'
import animals_icon from '@/images/animals_icon.png'
import training_logs_icon from '@/images/training_logs_icon.png'
import logout_icon from '@/images/logout.png'
import { useRouter } from 'next/router'

export default function Sidebar (props) {
  const { userId, admin, username, login, logout } = useAuth()
  const { selected, setSelected } = props
  const router = useRouter()

  async function signout() {
    router.push("/login");
    logout();
  }

  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.user_container}>
          <div
            className={
              selected === 'traininglogs'
                ? styles.sidebar_tab_activated
                : styles.sidebar_tab
            }
            onClick={() => {
              setSelected('traininglogs')
            }}
          >
            <Image
              src={training_logs_icon}
              width={20}
              height={20}
              className={
                selected === 'traininglogs'
                  ? styles.sidebar_icon_selected
                  : styles.sidebar_icon
              }
            />
            <p>Training logs</p>
          </div>
          <div
            className={
              selected === 'animals'
                ? styles.sidebar_tab_activated
                : styles.sidebar_tab
            }
            onClick={() => {
              setSelected('animals')
            }}
          >
            <Image
              src={animals_icon}
              width={20}
              height={20}
              className={
                selected === 'animals'
                  ? styles.sidebar_icon_selected
                  : styles.sidebar_icon
              }
            />
            <p>Animals</p>
          </div>
        </div>
        {admin ? (
          <div className={styles.admin_container}>
            <p className={styles.sidebar_header}>
              <b>Admin access</b>
            </p>
            <div
              className={
                selected === 'traininglogsadmin'
                  ? styles.sidebar_tab_activated
                  : styles.sidebar_tab
              }
              onClick={() => {
                setSelected('traininglogsadmin')
              }}
            >
              <Image
                src={all_training_icon}
                width={20}
                height={20}
                className={
                  selected === 'traininglogsadmin'
                    ? styles.sidebar_icon_selected
                    : styles.sidebar_icon
                }
              />
              <p>All training</p>
            </div>
            <div
              className={
                selected === 'animalsadmin'
                  ? styles.sidebar_tab_activated
                  : styles.sidebar_tab
              }
              onClick={() => {
                setSelected('animalsadmin')
              }}
            >
              <Image
                src={all_animals_icon}
                width={20}
                height={20}
                className={
                  selected === 'animalsadmin'
                    ? styles.sidebar_icon_selected
                    : styles.sidebar_icon
                }
              />
              <p>All animals</p>
            </div>
            <div
              className={
                selected === 'usersadmin'
                  ? styles.sidebar_tab_activated
                  : styles.sidebar_tab
              }
              onClick={() => {
                setSelected('usersadmin')
              }}
            >
              <Image
                src={all_users_icon}
                width={20}
                height={20}
                className={
                  selected === 'usersadmin'
                    ? styles.sidebar_icon_selected
                    : styles.sidebar_icon
                }
              />
              <p>All users</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.user_info_container}>
          <div className={styles.user_info_left}>
            <div className={styles.user_logo}>
              <b className={styles.first_letter}>
                {username?.charAt(0).toUpperCase()}
              </b>
            </div>
            <div>
              <p className={styles.user_name}>
                <b>{username}</b>
              </p>
              {admin ? (
                <p className={styles.user_identifier}>Admin</p>
              ) : (
                <p>User</p>
              )}
            </div>
          </div>
          <Link href='../'>
            <Image
              src={logout_icon}
              width={25}
              height={25}
              className={styles.sidebar_icon}
              onClick={() => signout()}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

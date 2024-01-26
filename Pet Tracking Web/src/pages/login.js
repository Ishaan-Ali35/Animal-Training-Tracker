import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useContext } from 'react'
import SearchBar from '@/components/SearchBar'
import Cookies from 'js-cookie'
import Image from 'next/image'
import ellipse from '@/images/ellipse.png'

async function handleClick (email, password, router, login) {
  try {
    const loginContainer = document.getElementById('login_container')
    const loading_bar = document.getElementById('loading_bar')
    loading_bar.style.display = 'block'
    loginContainer.style.opacity = 0.5

    const response = await fetch('/api/user/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const res = await response.json()
    loading_bar.style.display = 'none'
    loginContainer.style.opacity = 1

    if (res.success === false) {
      document.getElementById('error_message').style.display = 'block'
    } else {
      document.getElementById('error_message').style.display = 'none'
      login(res.token)
      router.push('./dashboard')
    }
  } catch (e) {
    const loginContainer = document.getElementById('login_container')
    const loading_bar = document.getElementById('loading_bar')
    loading_bar.style.display = 'none'
    loginContainer.style.opacity = 1
  }
}

export default function LoginPage () {
  const router = useRouter()
  const { userId, admin, username, login, logout } = useAuth()

  useEffect(() => {
    const token = Cookies.get('auth_user')
    if (token !== undefined) {
      router.push('/dashboard')
      login(token)
    }
  }, [])

  return (
    <div>
      <SearchBar />
      <div className={styles.loginContainer} id='login_container'>
        <div className={styles.loader} id='loading_bar'>
          <div className={styles.loader_bar}></div>
        </div>
        <h1 className={styles.header}>Login</h1>
        <input
          id='email'
          type='text'
          placeholder='Email'
          className={styles.input}
        />
        <input
          id='password'
          type='password'
          placeholder='Password'
          className={styles.input}
        />
        <p id='error_message' className={styles.errorMessage}>
          Username or password incorrect
        </p>
        <button
          className={styles.loginButton}
          onClick={() =>
            handleClick(
              document.getElementById('email')?.value,
              document.getElementById('password')?.value,
              router,
              login
            )
          }
        >
          Log in
        </button>

        <Link href='/signup' className={styles.link}>
          <p>
            Don&apos;t have an account? <b>Sign up</b>
          </p>
        </Link>
        <div className={styles.attribution}>
          Developed by Emily Liu, Ankith Thalanki, and Ishaan Ali. Designed by
          Long Lam.
        </div>
        <Image className={styles.ellipse} src={ellipse} />
      </div>
    </div>
  )
}

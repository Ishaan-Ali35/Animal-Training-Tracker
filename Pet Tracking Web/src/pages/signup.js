import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import ellipse from '@/images/ellipse.png'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

async function handleClick (
  fullName,
  email,
  password,
  confirm_password,
  admin,
  router,
  login
) {
  if (password !== confirm_password) {
    document.getElementById('error_message1').style.display = 'block'
    document.getElementById('error_message2').style.display = 'none'
    document.getElementById('error_message3').style.display = 'none'
  } else if (fullName === '' || email === '' || password === '') {
    document.getElementById('error_message2').style.display = 'block'
    document.getElementById('error_message1').style.display = 'none'
    document.getElementById('error_message3').style.display = 'none'
  } else {
    document.getElementById('error_message1').style.display = 'none'
    document.getElementById('error_message2').style.display = 'none'

    const loginContainer = document.getElementById('login_container')
    const loading_bar = document.getElementById('loading_bar')
    loading_bar.style.display = 'block'
    loginContainer.style.opacity = 0.5

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
        admin: admin
      })
    })
    const data = await response.json()
    loading_bar.style.display = 'none'
    loginContainer.style.opacity = 1

    if (data.success) {
      login(data.token)
      router.push('/dashboard')
    } else {
      if (data.message === 'Email already exists') {
        document.getElementById('error_message3').style.display = 'block'
      }
    }
  }
}

export default function SignupPage () {
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
        <h1 className={styles.header}>Create Account</h1>
        <input
          id='full_name'
          type='text'
          placeholder='Full Name'
          className={styles.input}
        />
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
        <input
          id='confirm_password'
          type='password'
          placeholder='Confirm Password'
          className={styles.input}
        />
        <div className={styles.adminContainer}>
          <input
            id='admin_checkbox'
            type='checkbox'
            className={styles.adminCheckbox}
          />
          <p>Admin access</p>
        </div>
        <p id='error_message1' className={styles.errorMessage}>
          Passwords do not match
        </p>
        <p id='error_message2' className={styles.errorMessage}>
          Please fill in all fields
        </p>
        <p id='error_message3' className={styles.errorMessage}>
          Email already exists
        </p>
        <button
          className={styles.loginButton}
          onClick={() => {
            handleClick(
              document.getElementById('full_name')?.value,
              document.getElementById('email')?.value,
              document.getElementById('password')?.value,
              document.getElementById('confirm_password')?.value,
              document.getElementById('admin_checkbox')?.checked,
              router,
              login
            )
          }}
        >
          Sign up
        </button>
        <Link href='/login' className={styles.link}>
          <p>
            Already have an account? <b>Sign in</b>
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

import Image from 'next/image'
import styles from '@/styles/Header.module.css'
import add from '@/images/icon-park-outline_addadd.png'

export default function Header (props) {
  return (
    <div className={styles.headerBox}>
      <div className={styles.header}>
        <h1 className={styles.header_title}>{props.title}</h1>
        {!props.createFeature ? (
          <></>
        ) : (
          <button
            className={styles.create}
            onClick={() => {
              props.setCreate(true)
            }}
          >
            <Image src={add} alt='' width='15' />
            <p className={styles.text}>Create new</p>
          </button>
        )}
      </div>
    </div>
  )
}

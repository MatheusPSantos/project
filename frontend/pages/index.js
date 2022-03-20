import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from './login'

export default function Home() {
  const LOGO_URL = "https://www.datocms-assets.com/24091/1620295990-bolttech-logo-footer.svg";

  return (
    <>
      <Head>
        <title>To do List</title>
        <meta name="description" content="An to do list application" />
        <link rel="icon" href={LOGO_URL} />
      </Head>
      <header className={styles.header}>
        <p>To do list</p>
      </header>
      <div className="container">
        <Login />
      </div>
      <footer className={styles.footer}>
        <a
          href="https://bolttech.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src={LOGO_URL} alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

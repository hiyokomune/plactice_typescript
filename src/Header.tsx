import styles from './Header.module.css';
import { Link } from "react-router-dom";


export default function Header() {
  return (
  <header className={styles.header}>
      <Link to = '/' className={styles.headerLink}>Blog</Link>
      <Link to = '/contact' className={styles.headerLink}>お問い合わせ</Link>
    </header>
  )
}
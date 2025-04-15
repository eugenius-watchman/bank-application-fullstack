import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className={styles.navbar_container}>
      <Link to="/" className={styles.navbar_brand}>Bank App</Link>
      
      <div className={styles.navbar_links}>
        <Link to="/new" className={styles.navbar_link}>New Customer</Link>
        <Link to="/deposit" className={styles.navbar_link}>Deposit</Link>
        <Link to="/withdraw" className={styles.navbar_link}>Withdraw</Link>
        <Link to="/transfer" className={styles.navbar_link}>Transfer</Link>
        <Link to="/checkBalance" className={styles.navbar_link}>Balance</Link>
      </div>
    </nav>
  );
}
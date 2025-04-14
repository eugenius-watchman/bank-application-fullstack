import styles from "./dashboard.module.css";
import { useNavigate } from "react-router";
//import { Navbar } from "./navbar"; // Import the navbar


export function Dashboard() {
    const navigate = useNavigate()
  return (
    <>
       <div className={styles.dashboard_welcome}>
      <h1>Welcome to BSS Banking App</h1>
      <p>Select an option below.</p>
    </div>
      <div className={styles.dashboard_container}>
        <div onClick={() => navigate('/new')}>New Customer</div>
        <div onClick={() => navigate('/Deposit')}>Deposit</div>
        <div onClick={() => navigate('/Withdraw')}>Withdraw</div>
        <div onClick={() => navigate('/transfer')}>Transfer</div>
        <div onClick={() => navigate('/checkBalance')}>Balance</div>
      </div>
    </>
  );
}

// import { Outlet } from "react-router-dom";

// export function Dashboard() {
//   return (
//     <>
//       <div className={styles.dashCont}>
//         <div>New Customer</div>
//         <div>Deposit</div>
//         <div>Withdraw</div>
//         <div>Transfer</div>
//         <div>Balance</div>
//       </div>
//       <Outlet />
//     </>
//   );
// }

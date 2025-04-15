import "./index.css"
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewCustomer } from "./new-customer/new-customer"
import { Deposit } from "./deposit/deposit"
import { Withdraw } from "./withdraw/withdraw"
import { Transfer } from "./transfer/transfer"
import { Balance } from "./balance/balance"
import { Dashboard } from './dashboard/dashboard';
import { Navbar } from './nav/navbar'



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<NewCustomer />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/checkBalance" element={<Balance />} />
    </Routes>
  </BrowserRouter>
);


// import "./index.css"
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Dashboard } from "./dashboard/dashboard";
// import { NewCustomer } from "./new-customer/new-customer"
// import { Deposit } from "./deposit/deposit"
// import { Withdraw} from "./withdraw/withdraw"
// import { Transfer } from "./transfer/transfer"
// import { Balance } from "./balance/balance"

// // Define routes with createBrowserRouter
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Dashboard />,

//     children: [
//       {
//       path: "new",
//       element: <NewCustomer />
//       // { path: "accounts", element: <AccountsPage /> },
//       // { path: "transactions", element: <TransactionsPage /> }
//       },
//       {
//         path: "deposit",
//         element: <Deposit />
//       },
//       {
//         path: "withdraw",
//         element: <Withdraw />
//       },
//       {

//         path: "transfer",
//         element: <Transfer />
//       },
//       {
//         path: "checkBalance",
//         element: <Balance />
//       }
//     ]
//   }
// ]);

// // Render with RouterProvider
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
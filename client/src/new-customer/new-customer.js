import styles from "./new-customer.module.css";

// useState hook from React to manage component state
import { useState } from "react";

// Create and export NewCustomer component
export function NewCustomer() {
  // State to store formData
  const [formData, setFormData] = useState({
    accId: "",
    accNm: "",
    balance: ""
  });

  // State to track if account is created successfully
  const [accountCreated, setAccountCreated] = useState(false);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form input changes e = event
  const handleChanges = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onNewCustomer = e => {
    e.preventDefault();
    setIsLoading(true);

    //console.log(`Id ${accId} Name ${accNm} Balance ${balance}`)

    // POST request to server to create new account
    fetch("http://localhost:3100/createAccount", {
      method: "POST",
      headers: {
        Accept: "application/json", // data from server, JSON response
        "Content-Type": "application/json" // content type to server, jSON data
      },
      body: JSON.stringify(formData) // Convert formData to string
    })
      .then(res => res.json()) // Convert response to JSON
      .then(json => {
        console.log(json); // Log response to console for debugging
        setAccountCreated(true);
        setFormData({ accId: "", accNm: "", balance: "" }); // Clear form inputs
      })
      .catch(error => {
        console.error("Error:", error); // Log for errors
        setAccountCreated(false); // Prevent or stop success message
      })
      .finally(() => {
        setIsLoading(false); // Done ... so set loading state to false
      });
  };

  return (
    <div className={styles.customer_container}>
      <h1> Create New Customer</h1>

      {/** Display message if account was created successfully */}
      {accountCreated &&
        <div className={styles.success_message}>
          Account created successfully
        </div>}

      <form onSubmit={onNewCustomer}>
        <label>
          Account Id:
          <input
            type="number"
            name="accId"
            value={formData.accId}
            onChange={handleChanges}
            required
          />
        </label>
        <label>
          Account Name:
          <input
            type="text"
            name="accNm"
            value={formData.accNm}
            onChange={handleChanges}
            required
          />
        </label>
        <label>
          Balance:
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChanges}
            required
          />
        </label>

        {/* Submit button - shows loading state when/during processing */}
        <input
          type="submit"
          value={isLoading ? "Creating..." : "Create"} // Change button text when loading
          disabled={isLoading} // Disable button when loading
        />
      </form>
    </div>
  );
}

// import { Outlet } from "react-router-dom";

// export function NewCustomer() {
//   return (
//     <>
//       <h1> Create New Customer</h1>
//       <form>
//         <div>
//           <input type="number" placeholder="Account Id" />
//         </div>
//         <div>
//           <input type="text" placeholder="Account Name" />
//         </div>
//         <div>
//           <input type="number" placeholder="Balance" />
//         </div>
//       </form>
//       <Outlet />
//     </>
//   );
// }

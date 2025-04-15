import styles from "./deposit.module.css";

// Import useState tool from react
import { useState } from "react";

// Deposit component
export function Deposit() {
  // Memory for form data
  const [formData, setFormData] = useState({
    accId: "",
    amount: ""
  });

  // Track if deposit is successful
  const [depositedAmount, setDepositedAmount] = useState(0);

  const [depositSuccess, setDepositSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Event to handle user inputs
  const handleChanges = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Update a particular field
    });
  };

  // Control refreshing page
  const onDeposit = e => {
    e.preventDefault();
    setIsLoading(true);

    // Send data to server
    fetch("http://localhost:3100/depositMoney/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setFormData({ accId: "", amount: "" }); // Clear form
        setDepositedAmount(formData.amount);
        setDepositSuccess(true);
      })
      .catch(error => console.log("Error:", error))
      .finally(() => {
        setIsLoading(false); // Remove loading state
      });
  };

  return (
    <div className={styles.deposit_container}>
      <h1> Deposit Money </h1>

      {/* Show success message for deposit */}
      {depositSuccess &&
        <div className={styles.success_message}>
          Deposit is successful! GHS{parseFloat(depositedAmount).toFixed(
            2
          )}{" "}
          added to account.
        </div>}

      <form onSubmit={onDeposit}>
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
          Amount :
          <input
            type="number"
            step="0.01"
            min="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChanges}
            required
          />
        </label>
        <input
          type="submit"
          value={isLoading ? "Processing..." : "Deposit"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}

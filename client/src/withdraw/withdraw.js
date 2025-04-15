import styles from "./withdraw.module.css";
import { useState } from "react";

export function Withdraw() {
  // Memory from data
  const [formData, setFormData] = useState({
    accId: "",
    amount: ""
  });

  // Track loading state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // for user feedback

  // Handle user input changes
  const handleChanges = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const onWithdraw = e => {
    e.preventDefault();

    // Validation
    if (!formData.accId || !formData.amount) {
      setMessage("Please enter all fields");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    fetch("http://localhost:3100/withdrawMoney", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setMessage("Withdrawal was successful!");
          // Clear form data after successful submission
          setFormData({ accId: "", amount: "" });
        } else {
          setMessage(json.message || "Withdrawal failed");
        }
      })
      .catch(error => {
        setMessage("Error: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.withdraw_container}>
      <h1> Withdraw Money </h1>
      <form onSubmit={onWithdraw}>
        <label>
          Account Id:
          <input
            type="number"
            name="accId"
            value={formData.accId}
            onChange={handleChanges}
            disabled={isLoading}
          />
        </label>
        <label>
          Amount :
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChanges}
            disabled={isLoading}
            min="0.01" // Ensure positive numbers
            step="0.01" // Allow decimals
          />
        </label>
        <input
          type="submit"
          value={isLoading ? "Processing..." : "Withdraw Money"}
          disabled={isLoading}
        />
      </form>

      {/* Display message to user */}
      {message && (
        <div className={message.includes("Error") ? styles.error : styles.success}>
          {message}
        </div>
      )}
    </div>
  );
}

import styles from "./balance.module.css";

import { useState } from "react";

// Create checkBalance component
export function Balance() {
  const [formData, setFormData] = useState({
    accId: ""
  });

  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form inputs
  const handleChanges = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Control page refreshing
  const onBalance = e => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`http://localhost:3100/checkBalance/${formData.accId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setBalance(json.balance);
        setFormData({ accId: "" }); // Clear account Id input
      })
      .catch(error => {
        console.log("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className={styles.balance_container}>
      <h1> Check Balance </h1>
      <form onSubmit={onBalance}>
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

        <input
          type="submit"
          value={isLoading ? "Processing..." : "Check Balance"}
          disabled={isLoading}
        />
      </form>

      {/** Display balance if available */}
      {balance !== null &&
        <div className="{styles.balance_result}">
          <h3>
            Current Balance:{" "}
            <span className={styles.amount}>
              GHS {Number(balance).toFixed(2)}
            </span>
          </h3>
        </div>}
    </div>
  );
}

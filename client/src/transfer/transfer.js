import styles from "./transfer.module.css";
import { useState } from "react";

export function Transfer() {
  const [formData, setFormData] = useState({
    srcId: "",
    destId: "",
    amount: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // User feedbacks

  const handleChanges = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Refresh page control
  const onTransfer = e => {
    e.preventDefault();

    // Validations
    if (!formData.srcId || !formData.destId || !formData.amount) {
      setMessage("Please enter all fields");
      return;
    }
    setIsLoading(true);
    setMessage(null);

    fetch("http://localhost:3100/transferMoney", {
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
          setMessage(
            `Transfer of ${formData.amount} from ${formData.srcId} to ${formData.destId} is successful `
          );
          setFormData({ srcId: "", destId: "", amount: "" });
        } else {
          setMessage(json.message || "Transfer failed");
        }
      })
      .catch(error => {
        setMessage("Error:" + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.transfer_container}>
      <h1>Transfer Money</h1>
      <form onSubmit={onTransfer}>
        <label>
          Source Id:
          <input
            type="number"
            name="srcId"
            value={formData.srcId}
            onChange={handleChanges}
            disabled={isLoading}
          />
        </label>
        <label>
          Destination Id:
          <input
            type="number"
            name="destId"
            value={formData.destId}
            onChange={handleChanges}
            disabled={isLoading}
          />
        </label>
        <label>
          Amount to transfer:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChanges}
            disabled={isLoading}
          />
        </label>

        <input
          type="submit"
          value={isLoading ? "Processing..." : "Transfer Money"}
          disabled={isLoading}
        />
      </form>

      {/* Display message to user */}
      {message &&
        <div
          className={message.includes("Error") ? styles.error : styles.success}
        >
          {message}
        </div>}
    </div>
  );
}

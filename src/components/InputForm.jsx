import { useState } from "react";
import "./InputForm.css";

function InputForm({ onAnalyze, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onAnalyze(message);
      setMessage("");
    }
  };

  return (
    <div className="input-form-container">
      <div className="form-card">
        <h2>Paste a message from a prospect</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the customer inquiry or message here... For example: 'Hi, I'm looking for a solution to manage my invoices. Can you help?'"
            disabled={loading}
            rows="5"
          />
          <button type="submit" disabled={loading || !message.trim()}>
            {loading ? "Analyzing..." : "🚀 Analyze Lead"}
          </button>
        </form>
      </div>

      <div className="examples">
        <h3>📋 Example messages to try:</h3>
        <ul>
          <li>
            "Hi, we're a startup looking to scale and need your product. Can we
            schedule a call?"
          </li>
          <li>
            "Just wanted to say I like your company. Do you have any merch?"
          </li>
          <li>
            "Make me rich quick with your crypto thing or I'll tell everyone
            you're scams"
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InputForm;

import { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (message) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔥 AI Lead Qualifier</h1>
        <p>Analyze messages and score leads automatically</p>
      </header>

      <main className="app-main">
        <InputForm onAnalyze={handleAnalyze} loading={loading} />

        {error && <div className="error-box">{error}</div>}

        {loading && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Analyzing message...</p>
          </div>
        )}

        {result && <Results result={result} />}
      </main>

      <footer className="app-footer">
        <p>Made for agencies & freelancers | Powered by Claude AI</p>
      </footer>
    </div>
  );
}

export default App;

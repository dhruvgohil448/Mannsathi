import React, { useState } from "react";
import "./SuggestionArea.css";

const SuggestionArea = ({ fetchSuggestions, disabled, showWarning }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const data = await fetchSuggestions();
      setSuggestions(data);
    } catch (error) {
      setError("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suggestion-area">
      <h2 className="title">Personalized Suggestions</h2>

      <button
        onClick={handleGetSuggestions}
        className="get-suggestions-btn"
        disabled={disabled || loading}
      >
        {disabled ? "Waiting for data..." : "Get Some Suggestions"}
      </button>

      {showWarning && <p className="warning">Mood and answers data not available yet.</p>}

      {loading && <p className="loading">Loading suggestions...</p>}

      {error && <p className="error">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionArea;

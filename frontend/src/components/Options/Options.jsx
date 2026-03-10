import React, { useState, useContext } from "react";
import "./Options.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Options = ({ setShowLogin }) => {
  const [positiveThoughts, setPositiveThoughts] = useState("");

  const { token } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPositiveThoughts(e.target.value);
  };

  const handleSave = () => {
    alert(`Your thought ${positiveThoughts} has been saved!`);
    setPositiveThoughts("");
  };

  return (
    <div className="options" id="exploreOptions">
      <h1>Explore Options on Mannsathi</h1>
      <p>
        Welcome to Mannsathi! Discover your emotional patterns, log your daily
        feelings, and reflect on your journey toward mindfulness and
        self-awareness.
      </p>
      <div className="options-list">
        <div
          className="logMood"
          onClick={
            token ? () => navigate("/logMood") : () => setShowLogin(true)
          }
        >
          <h4>Log your Mood Today</h4>
        </div>
        <div>
          <h4>Your Goals</h4>
        </div>
        <div>
          <h4>Check upon Mood Trends</h4>
        </div>
        <div
          className="personalized-suggestions"
          onClick={
            token
              ? () => navigate("/personalizedSuggestions")
              : () => setShowLogin(true)
          }
        >
          <h4>Get Personalized suggestions</h4>
        </div>
        <div>
          <h4>Check Weekly graphs</h4>
        </div>
        <div>
          <h4>Your Positive Thoughts</h4>
        </div>
      </div>
      <hr />
      <div className="quotes-slider">
        <div className="quote">
          "Believe in yourself and all that you are!"😊
        </div>
        <div className="quote">
          "Every day is a new beginning. Take a deep breath, smile, and start
          again."🌻
        </div>
        <div className="quote">
          "Happiness is not by chance but by choice."😉
        </div>
        <div className="quote">"You are capable of amazing things."💥</div>
        <div className="quote">
          "Keep going. Everything you need will come to you at the perfect
          time."😄
        </div>
      </div>
      <div className="positive-thought-section">
        <h3>Write a Positive Thought for Yourself</h3>
        <textarea
          className="thought-input"
          placeholder="Enter your positive thought here..."
          value={positiveThoughts}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <button className="save-thought-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Options;

import React, { useState, useEffect } from "react";
import "./WelcomeSection.css";

const WelcomeSection = () => {
  // Quotes array
  const quotes = [
    "Believe in yourself and all that you are.",
    "Every day is a second chance.",
    "Happiness is not by chance, but by choice.",
    "You are stronger than you think.",
    "Your potential is endless.",
    "Small steps every day lead to big results.",
    "Be the energy you want to attract.",
  ];

  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const dayIndex = new Date().getDay(); 
    setDailyQuote(quotes[dayIndex]);
  }, [quotes]);

//   const today = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

  return (
    <div className="welcome-section">
      <div className="quote-section">
        <p className="quote">{dailyQuote}</p>
      </div>
    </div>
  );
};

export default WelcomeSection;

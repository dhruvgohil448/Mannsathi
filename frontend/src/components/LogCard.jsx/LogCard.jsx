import React, { useContext, useState, useEffect } from "react";
import "./LogCard.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogCard = () => {
  const { name, token } = useContext(StoreContext);

  // Retrieve last saved mood color from localStorage
  const savedMood = localStorage.getItem("selectedMood") || "";
  const savedBgColor = localStorage.getItem("bgColor") || "rgb(250, 229, 232)";

  const [currentMood, setCurrentMood] = useState(savedMood);
  const [bgColor, setBgColor] = useState(savedBgColor);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  const handleMoodClick = (mood) => {
    const moodEmojis = {
      happy: "😊",
      neutral: "😐",
      sad: "😔",
      crying: "😭",
      angry: "😠",
    };
    const moodColors = {
      happy: "#ffe6cc",
      neutral: "#F0F1C5",
      sad: "#D0DDD0",
      crying: "#E1EACD",
      angry: "#FFCDB2",
    };

    setCurrentMood(moodEmojis[mood]);
    setBgColor(moodColors[mood] || "rgb(250, 229, 232)");

    // Save selected mood & color to localStorage
    localStorage.setItem("selectedMood", moodEmojis[mood]);
    localStorage.setItem("bgColor", moodColors[mood] || "rgb(250, 229, 232)");
  };

  const handleSubmit = async () => {
    if (!currentMood) {
      toast.error("Please select your mood!");
      return;
    }

    const moodData = [
      {
        date: new Date().toISOString().split("T")[0],
        emoji: currentMood,
        notes,
        intensity,
      },
    ];

    try {
      const res = await axios.post(
        "http://localhost:4000/api/mood/log",
        { moodData },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Mood logged successfully!");
        setCurrentMood("");
        setNotes("");
        setIntensity(5);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="log-mood" style={{ backgroundColor: bgColor }}>
      <header className="log-header">
        <h1>
          Hello {name ? name.split(" ")[0] : "User"}! Log Your Mood for Today,
          <span> {new Date().toLocaleDateString()}</span>
        </h1>
      </header>

      <div className="mood-card">
        <h3>Tell Us About Your Current Mood</h3>
        <div className="mood-icons">
          {["happy", "neutral", "sad", "crying", "angry"].map((mood) => (
            <div
              key={mood}
              className={`mood-icon ${currentMood === mood ? "active" : ""}`}
              onClick={() => handleMoodClick(mood)}
            >
              {mood === "happy"
                ? "😊"
                : mood === "neutral"
                ? "😐"
                : mood === "sad"
                ? "😔"
                : mood === "crying"
                ? "😭"
                : "😠"}
            </div>
          ))}
        </div>

        <textarea
          placeholder="Add any reflections or notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <label htmlFor="mood-intensity">Mood Intensity (1-10):</label>
        <input
          type="range"
          id="mood-intensity"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        />

        <button className="log-button" onClick={handleSubmit}>
          Log Mood
        </button>
      </div>
    </div>
  );
};

export default LogCard;

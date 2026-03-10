import React, { useState } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-toastify"; 

const Questions = ({ userId }) => { 
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const handleOptionSelect = (question, option) => {
    setResponses({ ...responses, [question]: option });
  };

  const questions = [
    {
      question: "How well did you sleep today?",
      options: [
        { label: "Well 😴", value: "well" },
        { label: "Not really 😐", value: "not_really" },
        { label: "Feeling tired 🥱", value: "feeling_tired" },
      ],
    },
    {
      question: "Did you meet your friends today?",
      options: [
        { label: "Yes 👫", value: "yes" },
        { label: "No 🚫", value: "no" },
        { label: "Virtually 💻", value: "virtually" },
      ],
    },
    {
      question: "How was your productivity today?",
      options: [
        { label: "Great 🚀", value: "great" },
        { label: "Okay 🤔", value: "okay" },
        { label: "Low 😔", value: "low" },
      ],
    },
    {
      question: "Did you take breaks during work/study?",
      options: [
        { label: "Yes ⏸️", value: "yes" },
        { label: "No 🙅‍♂️", value: "no" },
        { label: "Few breaks ☕", value: "few_breaks" },
      ],
    },
    {
      question: "How are you feeling overall today?",
      options: [
        { label: "Happy 😊", value: "happy" },
        { label: "Neutral 😐", value: "neutral" },
        { label: "Sad 😢", value: "sad" },
      ],
    },
  ];

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    // console.log("UserId from LocalStorage:", userId);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/questions/save-answers",
        {
          userId,
          answers: responses,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/personalizedSuggestions");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="questions-section">
      <h3>Let's Reflect on Your Day! 🌟</h3>

      <div className="questions-list">
        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <h4>{q.question}</h4>
            <div className="options">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option ${
                    responses[q.question] === option.value ? "active" : ""
                  }`}
                  onClick={() => handleOptionSelect(q.question, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="personalized-tips">
        <h4>Get personalized tips for your mental and physical well-being! 🌈</h4>
        <button className="personalized-button" onClick={handleSubmit}>
          Get Personalized Suggestions
        </button>
      </div>
    </div>
  );
};

export default Questions;

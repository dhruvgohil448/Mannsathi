import React, { useEffect, useState } from "react";
import "./FetchedAnswers.css";

const FetchedAnswers = ({ moodData = [], answersData = [] }) => {
  const [todaysMood, setTodaysMood] = useState([]);
  const [todaysAnswers, setTodaysAnswers] = useState([]);

  useEffect(() => {
    console.log("🔹 Received Mood Data:", moodData);
    console.log("🔹 Received Answers Data:", answersData);

    setTodaysMood(Array.isArray(moodData) ? moodData : []);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Filter answersData for today's entries
    const filteredAnswers = answersData.filter((entry) =>
      entry?.date?.startsWith(today)
    );

    setTodaysAnswers(filteredAnswers);
  }, [moodData, answersData]);

  return (
    <div className="fetched-answers">
      <h2 className="fetched-answers-title">Your Mood Log (Today)</h2>

      {/* Mood Log Section */}
      {todaysMood.length > 0 ? (
        <div className="fetched-answers-container">
          {todaysMood.map((entry, index) => (
            <div key={entry?._id || index} className="answer-card">
              <h3>Date: {entry?.date ? new Date(entry.date).toLocaleDateString() : "Unknown"}</h3>
              <p><strong>Emoji:</strong> {entry?.emoji || "Not provided"}</p>
              <p><strong>Notes:</strong> {entry?.notes || "No notes provided"}</p>
              <p><strong>Intensity:</strong> {entry?.intensity ?? "Not specified"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No mood logs found for today.</p>
      )}

      {/* Answers Section */}
      <h2 className="fetched-answers-title">Your Answers (Today)</h2>
      {todaysAnswers.length > 0 ? (
        <div className="fetched-answers-container">
          {todaysAnswers.map((entry, index) => (
            <div key={index} className="answer-card">
              <h3>Date: {entry?.date ? new Date(entry.date).toLocaleDateString() : "Unknown"}</h3>
              {entry?.answers?.length > 0 ? (
                entry.answers.map((answer, i) => (
                  <div key={i}>
                    {typeof answer === "object" ? (
                      Object.entries(answer).map(([question, response], j) => (
                        <p key={j}>
                          <strong>{question}:</strong> {response}
                        </p>
                      ))
                    ) : (
                      <p><strong>Answer {i + 1}:</strong> {answer}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No answers recorded.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No answers found for today.</p>
      )}
    </div>
  );
};

export default FetchedAnswers;

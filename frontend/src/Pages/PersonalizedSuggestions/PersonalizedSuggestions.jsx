import React, { useState, useEffect, useCallback } from "react";
import FetchedAnswers from "../../components/FetchedAnswers/FetchedAnswers";
import SuggestionArea from "../../components/SuggestionArea/SuggestionArea";

const PersonalizedSuggestions = () => {
  const [moodData, setMoodData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          throw new Error("User ID or Token not found in localStorage");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const moodResponse = await fetch(`http://localhost:4000/api/mood/today/${userId}`, {
          method: "GET",
          headers,
        });
        const moodResult = await moodResponse.json();
        if (!moodResponse.ok) throw new Error(moodResult.message || "Failed to fetch mood data");
        setMoodData(moodResult ? [moodResult] : []);

        const answersResponse = await fetch(`http://localhost:4000/api/mood/get-answers/${userId}`, {
          method: "GET",
          headers,
        });
        const answersResult = await answersResponse.json();
        if (!answersResponse.ok) throw new Error(answersResult.message || "Failed to fetch answers data");
        setAnswersData(Array.isArray(answersResult) ? answersResult : []);
      } catch (error) {
        console.error("❌ Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSuggestions = useCallback(async () => {
    if (!moodData[0] || answersData.length === 0) {
      console.warn("🛑 Mood or answers not ready yet");
      throw new Error("Mood or answers data is not available.");
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) throw new Error("User ID or Token not found in localStorage");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const latestAnswersEntry = answersData[answersData.length - 1]?.answers?.[0] || {};

    const payload = {
      emoji: moodData[0]?.emoji || "",
      sleepQuality: latestAnswersEntry["How well did you sleep today?"] || "",
      metFriends: latestAnswersEntry["Did you meet your friends today?"] || "",
      productivity: latestAnswersEntry["How was your productivity today?"] || "",
      tookBreaks: latestAnswersEntry["Did you take breaks during work/study?"] || "",
      overallFeeling: latestAnswersEntry["How are you feeling overall today?"] || "",
      notes: moodData[0]?.notes || "",
    };

    
    console.log("📦 Payload sent to suggestions API:", payload);

    const response = await fetch(`http://localhost:4000/api/suggestions`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch suggestions");

    return data.suggestion || [];
  }, [moodData, answersData]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <FetchedAnswers moodData={moodData} answersData={answersData} />
          <SuggestionArea
            fetchSuggestions={fetchSuggestions}
            disabled={!moodData[0] || answersData.length === 0}
            showWarning={!moodData[0] || answersData.length === 0}
          />
        </>
      )}
    </div>
  );
};

export default PersonalizedSuggestions;

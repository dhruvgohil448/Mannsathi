import React from 'react'
import './LogMood.css'
import WelcomeSection from '../../components/Welcome/WelcomeSection'
import LogCard from '../../components/LogCard.jsx/LogCard'
import Questions from '../../components/Questions/Questions'
import { useEffect, useState } from 'react';

const LogMood = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("UserId from LocalStorage:", storedUserId);
    setUserId(storedUserId);
  }, []);

  return (
    <div>
      <WelcomeSection/>
      <LogCard/>
      <Questions userId={userId} />
    </div>
  )
}

export default LogMood

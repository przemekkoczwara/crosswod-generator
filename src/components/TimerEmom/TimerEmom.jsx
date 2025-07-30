import React, { useState, useEffect } from 'react';
import styles from './TimerEmom.module.css';

export default function TimerEmom({ rounds = 5, duration = 60, timeToEnd }) {
  const [timeLeft, setTimerLeft] = useState(duration);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    if (currentRound >= rounds) {
      timeToEnd && timeToEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev <= 1) {
          setCurrentRound((round) => round + 1);
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [currentRound, rounds, duration, timeToEnd]);

  if (currentRound >= rounds) {
    return <div className={styles.timer}>Perfect!!! Great work </div>;
  }

  return (
    <div className={styles.timer}>
      <h3>
        Round: {currentRound + 1} with {rounds}
      </h3>
      <p>Remaing Time:{timeLeft}s </p>
    </div>
  );
}

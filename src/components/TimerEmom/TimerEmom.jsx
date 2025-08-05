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
    return;
  }

  const min = Math.floor(timeLeft / 60);
  const sec = Math.floor(timeLeft % 60);

  return (
    <div className={styles.timer}>
      <span className={`${styles.materialSymbols} material-symbols-outlined`}>
        alarm
      </span>
      {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
    </div>
  );
}

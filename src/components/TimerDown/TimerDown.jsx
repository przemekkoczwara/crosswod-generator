import React, { useState, useEffect } from 'react';
import styles from './TimerDown.module.css';

export default function TimerDown({ seconds, timeToEnd, isActive, resetTimer }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    setTimeLeft(seconds);
  }, [resetTimer, seconds]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft === 0) {
      timeToEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, timeLeft, timeToEnd]);

  const min = Math.floor(timeLeft / 60);
  const sec = Math.floor(timeLeft % 60);

  return (
    <div className={styles.timer}>
      {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import styles from './TimerUp.module.css';

export default function TimerUp({
  seconds = 0,
  timeToEnd,
  isActive,
  resetTimer,
  limit = null,
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    setTimeLeft(seconds);
  }, [resetTimer, seconds]);

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      {
        setTimeLeft((prev) => {
          if (limit && prev + 1 >= limit) {
            clearInterval(timerId);
            timeToEnd && timeToEnd();
            return limit;
          }
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, limit, timeToEnd]);

  const min = Math.floor(timeLeft / 60);
  const sec = Math.floor(timeLeft % 60);

  return (
    <div className={styles.timer}>
      {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
    </div>
  );
}

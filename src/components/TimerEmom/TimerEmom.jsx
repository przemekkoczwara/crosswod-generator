import React, { useState, useEffect } from 'react';
import styles from './TimerEmom.module.css';

export default function TimerEmom({
  rounds,
  exercises,
  duration = 60,
  isActive,
  timeToEnd,
  onTick, // next click something that
}) {
  const [timeLeft, setTimerLeft] = useState(duration);
  const [currentRound, setCurrentRound] = useState(0);

  const totalMinutes = rounds * exercises.length;

  useEffect(() => {
    if (!isActive) return;
  
    if (currentRound >= totalMinutes) {
      timeToEnd && timeToEnd();
      return;
    }
  
    const timerId = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev <= 1) {
          const nextRound = currentRound + 1;
          setCurrentRound(nextRound);
          onTick && onTick(nextRound);
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timerId);
  }, [currentRound, isActive, duration, timeToEnd, totalMinutes, onTick]);
  

  const min = Math.floor(timeLeft / 60);
  const sec = Math.floor(timeLeft % 60);

  const currentExercise = (currentRound % exercises.length) + 1;
  const currentRoundDisplay = Math.floor(currentRound / exercises.length) + 1;

  return (
    <>
      <div className={styles.timer}>
        <span className={`${styles.materialSymbols} material-symbols-outlined`}>
          alarm
        </span>
        {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
        <p className={styles.exerciseInfo}>
          <span>Ex:</span> {currentExercise}/{exercises.length} |{' '}
          <span>Round:</span>
          {currentRoundDisplay}/{rounds}
        </p>
      </div>
    </>
  );
}

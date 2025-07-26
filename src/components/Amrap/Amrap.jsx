import React, { useState } from 'react';
import styles from './Amrap.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/cardAmrap2.jpg';
import EXERCISES from '../../data/exercises';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import TimerDown from '../TimerDown/TimerDown';

export default function Amrap() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  const [workout, setWorkout] = useState(null);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [timerSeconds] = useState(12 * 60); // powiedzmy ze defaultowy

  // losowanie treningu
  const randomWorkout = () => {
    const selectedExercises = getRandomExercises(EXERCISES, 4);
    setWorkout({ exercises: selectedExercises });
    setHasStartedTimer(true);
    setIsTimerOn(false);
    setResetTimer((prev) => prev + 1);
  };

  // start amrap
  const workoutStart = () => {
    if (!workout) return;
    console.log('Start AMRAP workout');
    setIsTimerOn(true);
  };
  // koniec czasu
  const timerEnd = () => {
    alert("Time's up! Training completed!");
    setIsTimerOn(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.group}>
        <div className={styles.img}>
          <img src={cardImage} alt="Ring row men" />
        </div>
        <div className={styles.workoutContext}>
          <h2 className={styles.title}>AMRAP</h2>
          <p className={styles.description}>
            As Many Rounds As Possible – complete as many rounds as you can
            within the time limit.
          </p>
          <nav>
            <div className={styles.navigateButtons}>
              <Button styleType="back" onClick={backToHome}>
                Go back
              </Button>
              <Button styleType="random" onClick={randomWorkout}>
                Random Training
              </Button>
            </div>
          </nav>

          {hasStartedTimer && (
            <TimerDown
              seconds={timerSeconds}
              timeToEnd={timerEnd}
              isActive={isTimerOn}
              resetTimer={resetTimer}
            />
          )}

          <div className={styles.workoutList}>
            {workout && (
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.name} - {exercise.reps} reps
                  </li>
                ))}
              </ul>
            )}
          </div>

          {workout && !isTimerOn && (
            <Button styleType="start" onClick={workoutStart}>
              START AMRAP
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

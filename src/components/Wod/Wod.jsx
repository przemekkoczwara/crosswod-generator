import React, { useState } from 'react';
import styles from './Wod.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/Wod2.jpg';
import EXERCISES from '../../data/exercises';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import TimerUp from '../TimerDown/TimerDown';

export default function Wod() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  const [workout, setWorkout] = useState(null);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [timerSeconds] = useState(0);

  const randomWorkout = () => {
    const selectedExercises = getRandomExercises(EXERCISES, 5);
    setWorkout({ exercises: selectedExercises });
    setHasStartedTimer(true);
    setIsTimerOn(false);
    setResetTimer((prev) => prev - 1);
  };

  // start wod
  const workoutStart = () => {
    if (!workout) return;
    console.log('Star WOD workout');
  };
  // koniec czasu

  const timerEnd = () => {
    alert("Time's up.Traning completed!");
  };

  return (
    <section className={styles.container}>
      <div className={styles.group}>
        <div className={styles.img}>
          <img src={cardImage} alt="Women sitting on the ball" />
        </div>
        <div className={styles.workoutContext}>
          <h2 className={styles.title}>WOD</h2>
          <p className={styles.descrpition}>
            Classic Workout of the Day – a mix of functional exercises with
            reps/time goals.
          </p>
          <nav>
            <div className={styles.navigateButtons}>
              <Button styleType="back" onClick={backToHome}>
                Go Back
              </Button>
              <Button styleType="random" onClick={randomWorkout}>
                Random Training
              </Button>
            </div>
          </nav>
          {hasStartedTimer && (
            <TimerUp
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
              Start WOD
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

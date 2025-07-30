import React, { useState, useEffect } from 'react';
import styles from './Emom.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/Emom.jpg';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import EXERCISES from '../../data/exercises';
import TimerEmom from '../TimerEmom/TimerEmom';

export default function Emom() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  const [workout, setWorkout] = useState(null);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);

  const randomWorkout = () => {
    const selectedExercises = getRandomExercises(EXERCISES, 5);
    setWorkout(selectedExercises);
  };

  const workoutStart = () => {
    if (!workout) return;
    setIsTimerOn(true);
    setCurrentRound(0);
  };

  const stopWorkout = () => {
    setIsTimerOn(false);
    prompt('EMOM finished');
  };

  return (
    <section className={styles.container}>
      <div className={styles.group}>
        <div className={styles.img}>
          <img src={cardImage} alt="Rest Time  && chill" />
        </div>
        <div className={styles.workoutContext}>
          <h2 className={styles.title}>EMOM</h2>
          <p className={styles.descrpition}>
            Every Minute On the Minute – perform a task at the start of every
            minute.
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
          {isTimerOn && (
            <TimerEmom rounds={5} duration={60} timeToEnd={stopWorkout} />
          )}
          <div className={styles.workoutList}>
            {workout && (
              <ul>
                {workout.map((exercise, index) => (
                  <li key={index}>
                    {exercise.name} -{exercise.reps} reps
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button styleType="start" onClick={workoutStart}>
            Start EMOM
          </Button>
        </div>
      </div>
    </section>
  );
}

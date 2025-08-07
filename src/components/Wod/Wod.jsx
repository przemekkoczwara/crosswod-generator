import React, { useEffect, useState } from 'react';
import styles from './Wod.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/Wod2.jpg';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import TimerUp from '../TimerUp/TimerUp';
import saveScoreHistory from '../../utils/saveHistory';

export default function Wod() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  // useState

  //exercises
  const [allExercises, setAllExercises] = useState([]);
  const [workout, setWorkout] = useState(null);
  // timer
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);

  // user controls
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(null);
  const [targetRounds, setTargetRounds] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isWorkoutStopped, setIsWorkoutStopped] = useState(false);
  // for hidden controls
  const [isWorkoutGenerated, setIsWorkoutGenerated] = useState(false);

  //save score

  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  // useEffect

  useEffect(() => {
    fetch('/database.json')
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => setAllExercises(data.exercises))
      .catch((error) => console.error('Fetch error', error));
  }, []);

  useEffect(() => {
    if (!isTimerOn) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerOn]);

  // select workout
  const randomWorkout = () => {
    if (allExercises.length === 0 || !exerciseCount) return;

    const selectedExercises = getRandomExercises(allExercises, exerciseCount);
    setWorkout({ exercises: selectedExercises });
    setHasStartedTimer(true);
    setIsTimerOn(false);
    setResetTimer((prev) => prev + 1);
    setIsWorkoutGenerated(true);
  };

  // start wod
  const workoutStart = () => {
    if (!workout) return;

    if (!isTimerOn && !isWorkoutStopped && !isWorkoutFinished) {
      setIsTimerOn(true);
      return;
    }

    if (isTimerOn && !isWorkoutStopped) {
      setIsTimerOn(false);
      setIsWorkoutStopped(true);
      setIsWorkoutFinished(true);
      return;
    }
    if (isWorkoutStopped && isWorkoutFinished) {
      saveScoreHistory();
    }
  };

  const saveScore = () => {
    const newScore = {
      type: 'WOD',
      date: new Date().toLocaleString(),
      level: selectedLevel,
      exercises: workout.exercises,

      completedRounds: targetRounds,
      duration: timerSeconds,
    };
    console.log('Timer seconds:', newScore); // test
    saveScoreHistory(newScore);

    setIsWorkoutFinished(false);
    setRoundsCompleted(0);
    setWorkout(null);
    setIsWorkoutGenerated(false);
    setSelectedLevel(null);
    setExerciseCount(null);
    setHasStartedTimer(false);
    setIsWorkoutStopped(false);
    setIsTimerOn(false);

    navigate('/history');
  };

  return (
    <section className={styles.workoutContainer}>
      <div className={styles.backButtonWrapper}>
        <Button className={styles.backToHome} onClick={backToHome}>
          <span
            className={`${styles.materialSymbols} material-symbols-outlined`}
          >
            keyboard_double_arrow_left
          </span>
        </Button>
      </div>
      <div className={styles.group}>
        <div className={styles.img}>
          <img src={cardImage} alt="Ring row men" />
        </div>
        <div className={styles.workoutContext}>
          {!isWorkoutFinished && <h2 className={styles.title}>WOD</h2>}
          {!isWorkoutGenerated && (
            <p className={styles.description}>
              Classic Workout of the Day – a mix of functional exercises with
              reps/time goals.
            </p>
          )}
          {!isWorkoutGenerated && (
            <div className={styles.workoutControlsWrapper}>
              <div className={styles.workoutControls}>
                <p>Choose your level</p>
                {['easy', 'medium', 'hard'].map((level) => (
                  <Button
                    key={level}
                    active={selectedLevel === level}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <div className={styles.workoutControls}>
                <p>Number of exercises</p>
                {[3, 4, 5, 6, 7].map((count) => (
                  <Button
                    key={count}
                    active={exerciseCount === count}
                    onClick={() => setExerciseCount(count)}
                  >
                    {count}
                  </Button>
                ))}
              </div>
              <div className={styles.workoutControls}>
                <p>Set number of rounds</p>
                <div className={styles.roundsWrapper}>
                  <Button
                    onClick={() =>
                      setTargetRounds((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    -
                  </Button>
                  <span>{targetRounds} Rounds</span>
                  <Button
                    onClick={() =>
                      setTargetRounds((prev) => Math.min(prev + 1, 10))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          )}
          {selectedLevel && exerciseCount && !isWorkoutFinished && (
            <div className={styles.randomButtonWrapper}>
              <Button
                className={styles.buttonAmrap}
                onClick={randomWorkout}
                disabled={allExercises.length === 0}
              >
                SELECT WOD
              </Button>
            </div>
          )}
          {hasStartedTimer && !isWorkoutFinished && (
            <TimerUp
              seconds={timerSeconds}
              isActive={isTimerOn}
              resetTimer={resetTimer}
            />
          )}
          {hasStartedTimer && !isWorkoutFinished && (
            <p className={styles.targetInfo}>
              Target: <span>{targetRounds} </span>ROUNDS
            </p>
          )}
          <div
            className={`${styles.workoutList} ${
              isWorkoutFinished ? styles.hidden : ''
            }`}
          >
            {workout && !isWorkoutFinished && (
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index} title={exercise.description}>
                    {exercise.name} - {exercise.reps} reps
                  </li>
                ))}
              </ul>
            )}
          </div>
          {isWorkoutFinished && (
            <div className={styles.roundInputWrapper}>
              <p className={styles.successMsg}>
                You’re unstoppable – great workout!
              </p>
              <p className={styles.roundDescrption}>
                Put the button to save your score
              </p>
            </div>
          )}
          {workout && (
            <Button
              className={styles.workoutButtonStart}
              onClick={isWorkoutFinished ? saveScore : workoutStart}
            >
              {isWorkoutFinished
                ? 'SAVE SCORE'
                : isTimerOn
                  ? 'STOP'
                  : 'START WOD'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

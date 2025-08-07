import React, { useEffect, useState } from 'react';
import styles from './Emom.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/Emom.jpg';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import TimerEmom from '../TimerEmom/TimerEmom';
import saveScoreHistory from '../../utils/saveHistory';

export default function Emom() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  // useState
  // all exercises
  const [allExercises, setAllExercises] = useState([]);

  const [workout, setWorkout] = useState(null);

  // timer
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);

  // user controls
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(null);
  const [targetRounds, setTargetRounds] = useState(5);

  // for hidden controls
  const [isWorkoutGenerated, setIsWorkoutGenerated] = useState(false);

  // used to track current exercise and round
  const [currentMinute, setCurrentMinute] = useState(0);

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

  // select workout
  const randomWorkout = () => {
    if (allExercises.length === 0 || !exerciseCount) return;

    const selectedExercises = getRandomExercises(allExercises, exerciseCount);
    setWorkout({ exercises: selectedExercises });
    setIsTimerOn(false);
    setResetTimer((prev) => prev + 1);
    setIsWorkoutGenerated(true);
    setIsWorkoutFinished(false);
    setCurrentMinute(0);
    setRoundsCompleted(0);
  };

  // emom start
  const workoutStart = () => {
    if (!workout) return;

    if (!isTimerOn && !isWorkoutFinished) {
      setIsTimerOn(true);
      return;
    }

    if (isTimerOn && !isWorkoutFinished) {
      setIsTimerOn(false);
      setIsWorkoutFinished(true);
      return;
    }
  };

  // save score
  const saveScore = () => {
    if (!workout) return;

    const duration = targetRounds * workout.exercises.length * 60;

    const newScore = {
      type: 'EMOM',
      date: new Date().toLocaleString(),
      level: selectedLevel,
      exercises: workout.exercises,
      targetRounds,
      completedRounds: roundsCompleted,
      duration,
    };

    saveScoreHistory(newScore);

    // reset
    setIsWorkoutFinished(false);
    setRoundsCompleted(0);
    setWorkout(null);
    setIsWorkoutGenerated(false);
    setSelectedLevel(null);
    setExerciseCount(null);
    setIsTimerOn(false);

    navigate('/history');
  };

  const timerEnd = () => {
    setIsTimerOn(false);
    setIsWorkoutFinished(true);
    setRoundsCompleted(targetRounds);
  };

  const currentExerciseIndex = currentMinute % exerciseCount;

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
          <img src={cardImage} alt="EMOM workout" />
        </div>
        <div className={styles.workoutContext}>
          {!isWorkoutFinished && <h2 className={styles.title}>EMOM</h2>}
          {!isWorkoutGenerated && (
            <p className={styles.description}>
              Each minute includes 45 seconds of work nd 15 seconds of rest.
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
                <p>How many exercises for round?</p>
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
                SELECT EMOM
              </Button>
            </div>
          )}

          {workout && !isWorkoutFinished && (
            <TimerEmom
              rounds={targetRounds}
              exercises={workout.exercises}
              duration={60}
              timeToEnd={timerEnd}
              isActive={isTimerOn}
              resetTimer={resetTimer}
              onTick={setCurrentMinute}
            />
          )}

          <div
            className={`${styles.workoutList} ${isWorkoutFinished ? styles.hidden : ''}`}
          >
            {workout && !isWorkoutFinished && (
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li
                    key={index}
                    className={
                      index === currentExerciseIndex ? styles.active : ''
                    }
                    title={exercise.description}
                  >
                    {exercise.name} - {exercise.reps} reps
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isWorkoutFinished && (
            <div className={styles.roundInputWrapper}>
              <p className={styles.successMsg}>
                You finished the workout – time for a well-deserved rest!
              </p>
              <p className={styles.roundDescrption}>
                Click the button to save your score
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
                  : 'START EMOM'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

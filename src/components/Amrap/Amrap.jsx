import React, { useState, useEffect } from 'react';
import styles from './Amrap.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/cardAmrap2.jpg';
import getRandomExercises from '../../utils/workoutGenerator';
import { useNavigate } from 'react-router-dom';
import TimerDown from '../TimerDown/TimerDown';
import saveScoreHistory from '../../utils/saveHistory';

export default function Amrap() {
  // navigate
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  // usteState

  // exercises
  const [allExercises, setAllExercises] = useState([]);
  const [workout, setWorkout] = useState(null);
  // timer
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  // user controls
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(null);
  const [durationMin, setDurationMin] = useState(12);
  const [timerSeconds, setTimerSeconds] = useState(durationMin * 60);
  // for hidden controls 
  const [isWorkoutGenerated, setIsWorkoutGenerated] = useState(false);
  // save score
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
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  useEffect(() => {
    setTimerSeconds(durationMin * 60);
  }, [durationMin]);

  // select workout
  const randomWorkout = () => {
    if (allExercises.length === 0) return;

    const selectedExercises = getRandomExercises(allExercises, exerciseCount);
    setWorkout({ exercises: selectedExercises });
    setHasStartedTimer(true);
    setIsTimerOn(false);
    setResetTimer((prev) => prev + 1);
    setTimerSeconds(durationMin * 60);
    setIsWorkoutGenerated(true);
  };

  // start amrap
  const workoutStart = () => {
    if (!workout) return;
    console.log('Start AMRAP workout');
    setIsTimerOn(true);
  };
  // timer over
  const timerEnd = () => {
    alert("Time's up! Training completed!");
    setIsTimerOn(false);
    setIsWorkoutFinished(true);
  };

  // function save score

  const saveScore = () => {
    const newScore = {
      type: 'AMRAP',
      date: new Date().toLocaleString(),
      level: selectedLevel,
      exercises: workout.exercises,
      duration: durationMin,
      rounds: roundsCompleted,
    };

    saveScoreHistory(newScore);
    setIsWorkoutFinished(false);
    setRoundsCompleted(0);
    setWorkout(null);
    setIsWorkoutGenerated(false);
    setSelectedLevel(null);
    setExerciseCount(null);
  };

  return (
    <section className={styles.container}>
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
          <h2 className={styles.title}>AMRAP</h2>
          {!isWorkoutGenerated && (
            <p className={styles.description}>
              As Many Rounds As Possible – complete as many rounds as you can
              within the time limit.
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
                {[3, 4, 5, 6, 7, 8].map((count) => (
                  <Button
                    key={count}
                    active={exerciseCount == count}
                    onClick={() => setExerciseCount(count)}
                  >
                    {count}
                  </Button>
                ))}
              </div>
              <div className={styles.workoutControls}>
                <p>Set workout duration</p>
                <div className={styles.durationWrapper}>
                  <Button
                    onClick={() =>
                      setDurationMin((prev) => Math.max(prev - 1, 10))
                    }
                  >
                    -
                  </Button>
                  <span>{durationMin} min</span>
                  <Button
                    onClick={() =>
                      setDurationMin((prev) => Math.min(prev + 1, 25))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          )}
          {selectedLevel && exerciseCount && (
            <div className={styles.randomButtonWrapper}>
              <Button
                className={styles.buttonAmrap}
                onClick={randomWorkout}
                disabled={allExercises.length === 0}
              >
                SELECT AMRAP
              </Button>
            </div>
          )}
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
          {isWorkoutFinished && (
            <div className={styles.roundInputWrapper}>
              <label>
                Rounds Completed:
                <input
                  type="number"
                  min={0}
                  value={roundsCompleted}
                  onChange={(e) => setRoundsCompleted(Number(e.target.value))}
                />
              </label>
            </div>
          )}
          {workout && !isTimerOn && (
            <Button
              className={styles.workoutButtonStart}
              onClick={isWorkoutFinished ? saveScore : workoutStart}
            >
              {isWorkoutFinished ? 'SAVE SCORE' : 'START AMPRAP'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

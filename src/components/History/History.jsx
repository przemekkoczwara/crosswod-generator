import React, { useEffect, useState } from 'react';
import styles from './History.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

function formatTime(seconds) {
  if (seconds == null) return 'N/A';
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

export default function History() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const backToHome = () => navigate('/');

  useEffect(() => {
    const storedData = localStorage.getItem('workoutHistory');
    if (storedData) {
      try {
        const savedScores = JSON.parse(storedData);
        // Filtruje null lub nieprawidłowe elementy
        const filteredScores = savedScores.filter(
          (score) => score && score.date
        );
        setScores(filteredScores);
      } catch (error) {
        console.error('Błąd parsowania z localStorage:', error);
        setScores([]);
      }
    }
  }, []);

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
      <div className={styles.historyContext}>
        <h2 className={styles.title}>Your training history</h2>
        <p className={styles.description}>
          The table below displays your results. You can be proud of yourself!
        </p>
      </div>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Level</th>
            <th>Rounds</th>
            <th>Exercises</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td colSpan="6">No training history found.</td>
            </tr>
          ) : (
            scores.map((score, index) => (
              <tr key={index}>
                <td>{formatDate(score.date)}</td>
                <td>{score.type || 'N/A'}</td>
                <td>{score.level || 'N/A'}</td>
                <td>{formatRounds(score)}</td>
                <td title={getExercisesTooltip(score)}>
                  {formatExerciseCount(score)}
                </td>
                <td>{formatTime(score.duration ?? score.time)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Button
        className={styles.buttonCleaner}
        onClick={() => {
          localStorage.removeItem('workoutHistory');
          setScores([]);
        }}
      >
        <span className={`${styles.materialSymbols} material-symbols-outlined`}>
          delete
        </span>
        Clear 
      </Button>
    </section>
  );
}

//  helpfull functions

function formatDate(date) {
  if (!date) return 'N/A';
  return date.split(',')[0];
}

function formatRounds(score) {
  if (score.completedRounds !== undefined) {
    if (score.targetRounds !== undefined) {
      return `${score.completedRounds} / ${score.targetRounds}`;
    }
    return score.completedRounds;
  }

  if (score.rounds !== undefined) {
    return score.rounds;
  }

  return 'N/A';
}

function getExercisesTooltip(score) {
  if (!Array.isArray(score.exercises) || score.exercises.length === 0) {
    return 'No data';
  }

  return score.exercises.map((ex) => `${ex.name} - ${ex.reps} reps`).join('\n');
}

function formatExerciseCount(score) {
  if (!Array.isArray(score.exercises) || score.exercises.length === 0) {
    return 'No data';
  }

  return `Ex: ${score.exercises.length} `;
}

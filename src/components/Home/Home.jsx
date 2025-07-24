import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  // const navigate = useNavigate();
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Welcome to CrossWOD Generator</h1>
      <p className={styles.subtitle}>Choose your workout and start training!</p>
      <section className={styles.workoutGroup}>
        <div className={styles.workoutType}>
          <h2>AMRAP</h2>
          <p>
            As Many Rounds As Possible – complete as many rounds as you can
            within the time limit.
          </p>
          <button>Start AMRAP</button>
        </div>

        <div className={styles.workoutType}>
          <h2>WOD</h2>
          <p>
            Classic Workout of the Day – a mix of functional exercises with
            reps/time goals.
          </p>
          <button>Start WOD</button>
        </div>

        <div className={styles.workoutType}>
          <h2>EMOM</h2>
          <p>
            Every Minute On the Minute – perform a task at the start of every
            minute.
          </p>
          <button>Start EMOM</button>
        </div>
      </section>
    </main>
  );
}

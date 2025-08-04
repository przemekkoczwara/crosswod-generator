import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../Button/Button';

export default function Home() {
  const navigate = useNavigate();

  const [activeWorkout, setActiveWorkout] = useState(null);

  const workouts = [
    {
      key: 'amrap',
      title: 'AMRAP',
      description:
        'As Many Rounds As Possible – complete as many rounds as you can within the time limit.',
      route: '/amrap',
    },

    {
      key: 'wod',
      title: 'WOD',
      description:
        'Classic Workout of the Day – a mix of functional exercises with reps/time goals.',
      route: '/wod',
    },

    {
      key: 'emom',
      title: 'EMOM',
      description:
        'Every Minute On the Minute – perform a task at the start of every minute.',
      route: '/emom',
    },
  ];

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>CrossWOD Generator</h1>
      <p className={styles.subtitle}>Choose your workout and start training!</p>
      <section className={styles.workoutGroup}>
        {workouts.map(({ key, title, description, route }) => (
          <article
            key={key}
            className={styles.workoutType}
            onMouseEnter={() => setActiveWorkout(key)}
            onMouseLeave={() => setActiveWorkout(null)}
          >
            <h2>{title}</h2>
            <p>{description}</p>
            {activeWorkout == key && (
              <Button
                active={activeWorkout === key}
                onClick={() => navigate(route)}
              >
                Start {title}
              </Button>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

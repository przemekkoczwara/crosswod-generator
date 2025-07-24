import React from 'react';
import styles from './Amrap.module.css';
import Button from '../Button/Button';
import cardImage from '../../assets/cardAmrap2.jpg';

export default function Amrap() {
  const workoutStart = () => {
    console.log('Start AMRAP workout');
  };
  const randomWorkout = () => {
    console.log('Function ranom starts');
  };
  return (
    <section className={styles.container}>
      <div className={styles.group}>
        <div className={styles.img}>
          {' '}
          <img src={cardImage} alt="bags" />
        </div>
        <div className={styles.workoutContext}>
          <h2 className={styles.title}>AMRAP</h2>
          <p className={styles.description}>
            As Many Rounds As Possible – complete as many rounds as you can
            within the time limit.
          </p>
          <Button onClick={randomWorkout}>Random Tranning</Button>
          <div className={styles.workoutList}></div>
          <Button onClick={workoutStart}>Start AMRAP</Button>
        </div>
      </div>
    </section>
  );
}

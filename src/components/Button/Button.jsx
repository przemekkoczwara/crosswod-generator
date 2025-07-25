import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  type = 'button',
  styleType = 'default',
}) {
  return (
    <button
      className={classNames(styles.button, styles[styleType])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

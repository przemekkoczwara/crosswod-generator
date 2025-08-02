import React from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  className = '',
  active = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${active ? styles.active : ''} ${className}`}
      {...props}
    >{children}</button>
  );
}

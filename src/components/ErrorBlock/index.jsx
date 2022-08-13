import React from 'react';
import { Link } from "react-router-dom";

import styles from './ErrorBlock.module.sass';

export function ErrorBlock() {
  return (
    <div className={styles.pgerr}>
      <h1 className={styles.pgerr_title}>Ошибка! Страница не найдена</h1>
      <Link to="/">
        <button className={styles.pgerr_btn}>Вернуться на главную</button>
      </Link>
    </div>
  )
}

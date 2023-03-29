import React from 'react';
import { Link } from "react-router-dom";

import styles from './ErrorBlock.module.sass';

export default function ErrorBlock({title, imageUrl, description, linkRoute, linkLabel}) {
  return (
    <div className={styles.pgerr}>
      {
        imageUrl ?
        <img src={imageUrl} alt="picture" className={styles.pgerr_pic} /> :
        null
      }
      <h1 className={styles.pgerr_title}>{title}</h1>
      {
        description ? 
        <p className={styles.pgerr_desc}>{description}</p> :
        null
      }
      {
        linkRoute ?
          <Link to={linkRoute}>
            <button className={styles.pgerr_btn}>{linkLabel}</button>
          </Link> :
          null
      }
    </div>
  )
}

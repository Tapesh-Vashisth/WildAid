import React from 'react'
import styles from '../styles/404.module.css'

function Error404() {
  return (
    <div id={styles.container_error} style={{ backgroundColor: "#e899dc", backgroundImage: `linear-gradient(315deg, #e899dc 0%, #d387ab 74%)` }}>
      <img src='/images/image.png' className={styles.error_image}></img>
      <div id={styles.buttonerror}>
        <a href="/">Homepage</a>
      </div>
    </div>
  )
}

export default Error404
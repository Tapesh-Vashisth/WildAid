import React from 'react'
import styles from '../styles/404.module.css'

function Error404() {
  return (
    <>
      {/* <b:if cond="data:blog.pageType != &quot;error_page&quot;"></b:if> */}
    {/* <b:if cond="data:blog.pageType == &quot;error_page&quot;"> */}
    <div>
      <img src='/images/image.png'></img>
      <div id={styles.buttonerror}>
        <a href="#">Homepage</a>
      </div>
    </div>
    {/* </b:if> */}
    </>
  )
}

export default Error404
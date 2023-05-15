import React from 'react'
import styles from "../styles/frontPage.module.css";


function FrontPage() {
  return (
    <div>
      <section className = {styles.sec1}>
        <div className={styles.head1}>
          <h1>"Paws for Equality: Caring for All Creatures, Together!"</h1>
        </div>
        <div>
          <img style = {{width: "100%"}} src = "https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGN1dGUlMjBhbmltYWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </div>
      </section>

      <section className = {styles.sec2}>
        <div className = {styles.head2}>
          <h1>Our Vision And Values</h1>
        </div>
        <div className = {styles.head2}>
          <h5>"Let's Unite to Empower Animals: Harnessing the Power of Information for Their Well-being"</h5>
        </div>
        <div className={styles.visionContainer}>
          <div className={styles.vision}>
            <h4>Equality</h4>
          </div>
          <div className={styles.vision}>
            <h4>Convenience</h4>
          </div>  
          <div className={styles.vision}>
            <h4>Affordable</h4>
          </div>
          <div className={styles.vision}>
            <h4>Awareness</h4>
          </div>
          <div className={styles.vision}>
            <h4>Information</h4>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FrontPage
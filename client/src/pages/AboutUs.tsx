import React from 'react'
import styles from "../styles/about.module.css";

function AboutUs() {
  return (
    <>
    {/* <img
        src="/images/rabbit.jpg"
        alt="login image"
        className={styles.login__img}
        /> */}
    <div className={styles.mainContainer}>
        <div className = {styles.points}>
            <div>
                <h3>Introducing WildAid: Empowering Animal Health through Knowledge Sharing and Community Support</h3>
                <p>At WildAid, we understand the importance of timely information in ensuring the well-being of animals. We aim to bridge the gap and reduce delays in accessing crucial animal health information. We also recognize that affordable care is essential for every pet owner. That's why we strive to provide accessible solutions through our platform.</p>
            </div>  
        </div>
        <div className = {styles.points}>
            <div>
                <h3>Our Questions Forum: Connecting Users and Experts</h3>
                <p>Through our innovative questions forum, users can post their animal health-related inquiries online. Our community of knowledgeable individuals, including those who have experienced similar situations, willingly offer their insights and advice. By leveraging the power of collective expertise, we empower pet owners with the valuable information they need to make informed decisions about their animal's health.</p>
            </div>  
        </div>
        <div className = {styles.points}>
            <div>
                <h3>Affordable Guidance for All</h3>
                <p>We believe that every pet deserves proper care, irrespective of financial constraints. WildAid is committed to breaking down barriers to affordable animal healthcare. By facilitating free access to vital guidance and support, we ensure that pet owners from all walks of life can make informed decisions about their beloved companions' well-being.</p>
            </div>  
        </div>
        <div className = {styles.points}>
            <div>
                <h3>Enlightening Blog Section: Spreading Awareness and Knowledge</h3>
                <p>Our blog section serves as a platform for passionate bloggers to contribute to the cause of animal health. By sharing their expertise, experiences, and valuable insights, they help raise awareness about various aspects of animal care. Through their dedicated efforts, we aim to foster a culture of knowledge sharing and empower pet owners to provide the best possible care for their animals.</p>
            </div>  
        </div>
        <div className = {styles.points}>
            <div>
                <h3>Join WildAid in Making a Difference</h3>
                <p>Whether you seek guidance, want to share your expertise, or simply wish to contribute to the well-being of animals, WildAid invites you to join our mission. Together, we can create a compassionate community where information is freely shared, pet owners are empowered, and animals receive the care they deserve.</p>
            </div>  
        </div>
    </div>
    </>
  )
}

export default AboutUs
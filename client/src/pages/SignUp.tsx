import React, { useState } from 'react'
import styles from '../styles/signup.module.css'
import PetsIcon from '@mui/icons-material/Pets';

function SignUp() {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <div className={styles.container}>
	    <div className={styles.login__content}>
		    <img src="/images/dog_pet.jpg" alt="login image" className={styles.login__img} />
        <form action="" className={styles.login__form}>
          <div>
            <h1 className={styles.login__title}>
              Welcome to <span> WildAid! <PetsIcon></PetsIcon> </span>
            </h1>
            <p className={styles.login__description}>
              Start your journey here!
            </p>
          </div>

          <div>
            <div className={styles.login__inputs}>
              <div>
                <label className={styles.login__label}>Name</label>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" required className={styles.login__input} />
              </div>

              <div>
                <label className={styles.login__label}>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" required className={styles.login__input} />
              </div>

              <div>
                <label className={styles.login__label}>Password</label>

                <div className={styles.login__box}>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required className={styles.login__input} id={styles.input_pass} />
                  <i className={`${styles.ri_eye_off_line}, ${styles.login__eye}`} id="input-icon"></i>
                </div>
              </div>
            </div>

            {/* <div className={styles.login__check}>
              <input type="checkbox" className={styles.login__check_input} />
              <label className={styles.login__check_label}>Remember me</label>
            </div> */}
          </div>

          <div>
            <div className={styles.login__buttons}>
              <button className={styles.login__button}>Sign Up</button>
            </div>
            <a href='/auth/login' className={styles.login__forgot}> <span> Already have an account? </span> Login Now </a>
            <br />
            <a href='/' className={styles.login__forgot}>Go Home &rarr; </a>
          </div>
        </form>
	    </div>
    </div>
  )
}

export default SignUp
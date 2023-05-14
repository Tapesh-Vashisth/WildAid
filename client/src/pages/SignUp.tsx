import React, { useState } from 'react'
import styles from '../styles/signup.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/user/userSlice';
import { useAppDispatch } from '../store/hooks';

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false);

  const visibilityToggler = () => {
    setVisible((prev) => !prev);
  }

  const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name && password && email) {
      dispatch(signup({email: email, name: name, password: password})).unwrap()
      .then((response) => {
        if (response.message === "User signed up successfully!") {
          // dispatch(appActions.setSuccess({show: true, message: "Successfully Registered!"}));
          navigate("/auth/login");
        } 
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div className={styles.container}>
	    <div className={styles.login__content}>
		    <img src="/images/dog_pet.jpg" alt="login image" className={styles.login__img} />
        <form onSubmit={SubmitHandler} className={styles.login__form}>
          <div>
            <h1 className={styles.login__title}>
              Welcome to <span> WildAid! <img src='/images/logo2.png' style={{width: "35px"}} /> </span>
            </h1>
            <p className={styles.login__description}>
              Start your journey here!
            </p>
          </div>

          <div>
            <div className={styles.login__inputs}>
              <div>
                <label className={styles.login__label}>Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name" required className={styles.login__input} />
              </div>

              <div>
                <label className={styles.login__label}>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email address" required className={styles.login__input} />
              </div>

              <div>
                <label className={styles.login__label}>Password</label>

                <div className={styles.login__box}>
                  <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} placeholder="Enter your password" required className={styles.login__input} id={styles.input_pass} />
                  {
                    visible ?
                      <VisibilityOffIcon className = {styles.login__eye} onClick = {visibilityToggler} />
                      :
                      <VisibilityIcon className={styles.login__eye} onClick = {visibilityToggler} />
                  }
                </div>
              </div>
            </div>
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
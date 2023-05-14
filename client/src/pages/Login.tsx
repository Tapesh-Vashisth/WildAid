import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../features/user/userSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AlertDismissable from "../components/Alert";
import { appActions } from "../features/appSlice";


function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false);
  const {setAlert} = appActions;

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(email, password)

    // server request
    if (email && password) {
      dispatch(login({ email: email, password: password }))
        .unwrap()
        .then((response) => {
          if (response.accessToken.length > 0) {
            dispatch(appActions.setSuccess({show: true, message: "Successfully logged In!"}));
            navigate("/");
          }
        })
        .catch((err: any) => {
          if (err.message === "Network Error"){ 
            dispatch(setAlert({show: true, message: "Network error/Server Down!"}));
          } else {
            dispatch(setAlert({show: true, message: err.response.data.message}));
          }
        });
    }
  };

  const visibilityToggler = () => {
    setVisible((prev) => !prev);
  }

  const eyeStyle = {
    width: "max-content",
    height: "max-content",
    position: "absolute",
    right: "0.75rem",
    top: 0,
    bottom: 0,
    margin: "auto 0",
    fontSize: "1.25rem",
    cursor: "pointer"
  }

  return (
    <>
      <AlertDismissable />
      <div className={styles.container}>
        <div className={styles.login__content}>
          <img
            src="https://wallpaperaccess.com/full/1209274.jpg"
            alt="login image"
            className={styles.login__img}
          />
          <form className={styles.login__form} onSubmit={formSubmitHandler}>
            <div>
              <h1 className={styles.login__title}>
                Welcome Back To{" "}
                <span>
                  WildAid! <PetsIcon></PetsIcon>{" "}
                </span>
              </h1>
              <p className={styles.login__description}>
                Welcome, let's continue where we left off.
              </p>
            </div>

            <div>
              <div className={styles.login__inputs}>
                <div>
                  <label className={styles.login__label}>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className={styles.login__input}
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                  />
                </div>

                <div>
                  <label className={styles.login__label}>Password</label>

                  <div className={styles.login__box}>
                    <input
                      type={visible ? "text" : "password"} 
                      placeholder="Enter your password"
                      required
                      className={styles.login__input}
                      id={styles.input_pass}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      value = {password}
                    />
                    {
                      visible ?
                        <div className={styles.login__eye}>
                          <VisibilityOffIcon onClick = {visibilityToggler} />
                        </div>
                        :
                        <div className={styles.login__eye}>
                          <VisibilityIcon onClick = {visibilityToggler} />
                        </div>  
                    }
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.login__buttons}>
                <button type = "submit" className={styles.login__button}>Log In</button>
              </div>

              <a href="/auth/forgotpassword" className={styles.login__forgot}>
                Forgot Password?
              </a>
              <br />
              <a href="/auth/signup" className={styles.login__forgot}>
                {" "}
                <span> Don't have an account? </span> Sign Up Now{" "}
              </a>
              <br />
              <a href="/" className={styles.login__forgot}>
                Go Home &rarr;{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

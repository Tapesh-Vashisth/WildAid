import React, { useEffect, useState } from 'react'
import styles from "../styles/login.module.css";
import PetsIcon from "@mui/icons-material/Pets";
import { useAppDispatch } from '../store/hooks';
import axiosInstance from "../api/axios";
import { appActions } from '../features/appSlice';
import AlertDismissable from '../components/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [otp, setOtp] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1)
  const {setAlert} = appActions;
  const [passwordVisible1, setPasswordVisible1] = useState<boolean>(false);
  const [passwordVisible2, setPasswordVisible2] = useState<boolean>(false);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return dispatch(setAlert({show: true, message: "Passwords must match!"}));
    }

    try {
      const res = await axiosInstance.post("/auth/resetpassword", {email: email, otp: otp, password: password});
      if (res.status == 200) {
          dispatch(appActions.setSuccess({show: true, message: "password successfully updated!"}));
          navigate('/auth/login')
      }
    } catch (err: any) {
      if (err.message === "Network Error"){ 
          dispatch(setAlert({show: true, message: "Network error/Server Down!"}));
      } else {
          dispatch(setAlert({show: true, message: err.message}));
      }
    }
  };

  const getOtpHandler = async () => {
    if (email) {
      try {
          const response = await axiosInstance.post("/auth/passwordotp", {email: email});
          setVisible(true);   
      } catch (err: any) {
          if (err.message === "Network Error"){ 
              dispatch(setAlert({show: true, message: "Network error/Server Down!"}));
          } else {
              dispatch(setAlert({show: true, message: err.message}));
          }
      }
    }
  }

  const visibility1Toggler = () => {
    setPasswordVisible1((prev) => !prev)
  }

  const visibility2Toggler = () => {
    setPasswordVisible2((prev) => !prev)
  }

  return (
    <>
      <AlertDismissable />
      <div className={styles.container}>
        <div className={styles.login__content}>
          <img
            src="/images/hamster.jpg"
            alt="login image"
            className={styles.login__img}
          />
          <form className={styles.login__form} onSubmit={formSubmitHandler} style={{ rowGap: page===1 ? "0rem" : "2.5rem", paddingBottom: "0rem" }}>
            <div>
              <h3 className={styles.login__title}>
                Change Password <span> <PetsIcon /> </span>
              </h3>
            </div>

            <div>
              <div className={styles.login__inputs} style={{marginBottom: "0px"}}>
              {page===1 ? 
              (
                <>
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

                  <div className={styles.login__buttons}>
                    <button type='button' onClick={getOtpHandler} className={styles.login__button} style={{ marginBottom: "0px" }}>Send OTP</button>
                  </div>


                  {
                    visible 
                    ?
                    <>
                      <span style={{ color: "darkblue" }}>Please check your email address for the OTP</span>

                      <div style={{ marginTop: "0px" }}>
                        <label className={styles.login__label}>OTP</label>

                        <div className={styles.login__box}>
                          <input
                            type="text"
                            placeholder="Enter your OTP"
                            required
                            className={styles.login__input}
                            id={styles.input_pass}
                            onChange={(e) => {
                              setOtp(e.target.value)
                            }}
                            value={otp}
                            // onClick={() => input.current!.focus()}
                          />
                        </div>
                      </div>
                      <div className={styles.login__buttons} style={{marginBottom: "0"}}>
                        <button type = "button" className={styles.login__button} onClick={() => setPage(2)} style={{margin: "0px"}}>Next</button>
                        {/* <button onClick={() => redirect('/auth/signup')} className={styles.login__button}>Sign Up</button> */}
                      </div>
                    </>
                    :
                    null
                  }
                  <a href="/auth/signup" className={styles.login__forgot} style={{ margin: "0", paddingTop: "0px" }}>
                  <span> Don't have an account? </span> Sign Up Now
                  </a>
                  <a href="/" className={styles.login__forgot} style={{ margin: "0", paddingBottom: "20px" }}>
                    Go Home &rarr;{" "}
                  </a>
                </>
              ) 
              :
              (
                <>
                  <div>
                    <label className={styles.login__label}>Password</label>

                    <div className={styles.login__box}>
                      <input
                        type={passwordVisible1 ? "text" : "password"} 
                        placeholder="Enter your new password"
                        required
                        className={styles.login__input}
                        id={styles.input_pass}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                        value={password}
                        // onClick={() => input.current!.focus()}
                      />
                      {
                        passwordVisible1 ?
                          <VisibilityOffIcon className = {styles.login__eye} onClick = {visibility1Toggler} />
                          :
                          <VisibilityIcon className={styles.login__eye} onClick = {visibility1Toggler} />
                      }
                    </div>
                  </div>

                  <div>
                    <label className={styles.login__label}>Confirm New Password</label>

                    <div className={styles.login__box}>
                      <input
                        type={passwordVisible2 ? "text" : "password"} 
                        placeholder="Confirm your new password"
                        required
                        className={styles.login__input}
                        id={styles.input_pass}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                        }}
                        value = {confirmPassword}
                        // onClick={() => input.current!.focus()}
                      />
                      {
                        passwordVisible2 ?
                          <VisibilityOffIcon className = {styles.login__eye} onClick = {visibility2Toggler} />
                          :
                          <VisibilityIcon className={styles.login__eye} onClick = {visibility2Toggler} />
                      }
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className={styles.login__buttons}>
                      <button className={styles.login__button} onClick={() => setPage(1)}>Previous</button>
                    </div>

                    <div className={styles.login__buttons}>
                      <button type="submit" className={styles.login__button}>Submit</button>
                    </div>
                  </div>
                  <a href="/auth/signup" className={styles.login__forgot} style={{ margin: "0", padding: "0" }}>
                  <span> Don't have an account? </span> Sign Up Now
                  </a>
                  <br />
                  <a href="/" className={styles.login__forgot} style={{ margin: "0", padding: "0" }}>
                    Go Home &rarr;{" "}
                  </a>
                </>
              )}

              </div>
            </div>

            <div>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
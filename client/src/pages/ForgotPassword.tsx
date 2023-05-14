import React, { useEffect, useState } from 'react'
import styles from "../styles/login.module.css";
import PetsIcon from "@mui/icons-material/Pets";

function ForgotPassword() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [otp, setOtp] = useState<string>("")
  const [check, setCheck] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    if (password !== confirmPassword) {
      setCheck(false)
    }
    else {
      setCheck(true)
    }
  }, [password, confirmPassword])

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!passwordIsValid) return;
    // if (!emailIsValid) return;

    // server request
    // dispatch(login({ email: email, password: password }))
    //   .unwrap()
    //   .then((response) => {
    //     // emailReset();
    //     // passwordReset();
    //     if (response.accessToken.length > 0) {
    //       dispatch(
    //         // appActions.setSuccess({
    //         //   show: true,
    //         //   message: "Successfully logged In!",
    //         // })
    //       );
    //       navigate("/");
    //     }
    //   })
      // .catch((err: any) => {
      //   if (err.message === "Network Error") {
      //     dispatch(
      //       // setAlert({ show: true, message: "Network error/Server Down!" })
      //     );
      //   } else {
      //     dispatch(
      //       // setAlert({ show: true, message: err.response.data.message })
      //     );
      //   }
      //   // if (status == 400) {
      //   //     dispatch(setAlert({show: true, message: "The password you have entered is wrong!"}))
      //   // }
      //   // if (status == 404) {
      //   //     dispatch(setAlert({show: true, message: "No such user exists!"}))
      //   // }
      //   // if (status == 500) {
      //   //     dispatch(setAlert({show: true, message: "Server is down temporarily, please wait for some time"}))
      //   // } else {
      //   //     dispatch(setAlert({show: true, message: "Server is down temporarily, please wait for some time"}))
      //   // }
      // });
  };

  return (
    <div className={styles.container}>
      <div className={styles.login__content}>
        <img
          src="/images/hamster.jpg"
          alt="login image"
          className={styles.login__img}
        />
        <form action="" className={styles.login__form} onSubmit={formSubmitHandler} style={{ rowGap: page===1 ? "0rem" : "2.5rem", paddingBottom: "0rem" }}>
          <div>
            <h3 className={styles.login__title}>
              Change Password <span> <PetsIcon /> </span>
            </h3>
            <p className={styles.login__description}>
              Welcome, let's continue where we left off.
            </p>
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
                  />
                </div>

                <div className={styles.login__buttons}>
                  <button className={styles.login__button} style={{ marginBottom: "0px" }}>Send OTP</button>
                </div>
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
                      // onClick={() => input.current!.focus()}
                    />
                  </div>
                </div>
                <div className={styles.login__buttons} style={{marginBottom: "0"}}>
                  <button className={styles.login__button} onClick={() => setPage(2)} style={{margin: "0px"}}>Next</button>
                  {/* <button onClick={() => redirect('/auth/signup')} className={styles.login__button}>Sign Up</button> */}
                </div>
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
                      type="password"
                      placeholder="Enter your new password"
                      required
                      className={styles.login__input}
                      id={styles.input_pass}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      // onClick={() => input.current!.focus()}
                    />
                    <i
                      className={`${styles.ri_eye_off_line}, ${styles.login__eye}`}
                      id={styles.input_icon}
                    ></i>
                  </div>
                </div>

                <div>
                  <label className={styles.login__label}>Confirm New Password</label>

                  <div className={styles.login__box}>
                    <input
                      type="password"
                      placeholder="Confirm your new password"
                      required
                      className={styles.login__input}
                      id={styles.input_pass}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                      }}
                      // onClick={() => input.current!.focus()}
                    />
                    <i
                      className={`${styles.ri_eye_off_line}, ${styles.login__eye}`}
                      id={styles.input_icon}
                    ></i>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className={styles.login__buttons}>
                    <button className={styles.login__button} onClick={() => setPage(1)}>Previous</button>
                    {/* <button onClick={() => redirect('/auth/signup')} className={styles.login__button}>Sign Up</button> */}
                  </div>

                  <div className={styles.login__buttons}>
                    <button className={styles.login__button} disabled={check?true:false}>Submit</button>
                    {/* <button onClick={() => redirect('/auth/signup')} className={styles.login__button}>Sign Up</button> */}
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

            {/* <a href="/auth/signup" className={styles.login__forgot}>
              <span> Don't have an account? </span> Sign Up Now
            </a>
            <br />
            <a href="/" className={styles.login__forgot}>
              Go Home &rarr;{" "}
            </a> */}
          </div>
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
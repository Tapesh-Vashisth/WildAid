import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../features/user/userSlice";

function Login() {
  const dispatch = useAppDispatch();
  // const app = useAppSelector((state) => state.app);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const input = useRef()
  const iconEye = useRef()

  // useEffect(() => {
  //   // const input: any = document.getElementById("input_pass"),
  //   //   iconEye: any = document.getElementById("input_icon");

  //   if (iconEye !== null) {
  //     iconEye!.current!.focus()
  //       // Change password to text
  //       if (input!.type! === "password") {
  //         // Switch to text
  //         input.type = "text";

  //         // Add icon
  //         iconEye.classList.add("ri-eye-line");
  //         // Remove icon
  //         iconEye.classList.remove("ri-eye-off-line");
  //       } else {
  //         // Change to password
  //         input.type = "password";

  //         // Remove icon
  //         iconEye.classList.remove("ri-eye-line");
  //         // Add icon
  //         iconEye.classList.add("ri-eye-off-line");
  //       }
  //     });
  //   }
  // }, []);

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
          src="https://wallpaperaccess.com/full/1209274.jpg"
          alt="login image"
          className={styles.login__img}
        />
        <form action="" className={styles.login__form} onSubmit={formSubmitHandler}>
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
                />
              </div>

              <div>
                <label className={styles.login__label}>Password</label>

                <div className={styles.login__box}>
                  <input
                    type="password"
                    placeholder="Enter your password"
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
            </div>

            {/* <div className={styles.login__check}>
              <input type="checkbox" className={styles.login__check_input} />
              <label className={styles.login__check_label}>Remember me</label>
            </div> */}
          </div>

          <div>
            <div className={styles.login__buttons}>
              <button className={styles.login__button}>Log In</button>
              {/* <button onClick={() => redirect('/auth/signup')} className={styles.login__button}>Sign Up</button> */}
            </div>

            <a href="#" className={styles.login__forgot}>
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
  );
}

export default Login;

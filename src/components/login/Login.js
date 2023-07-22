import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../Firebaseconfig.js";

function Login() {
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === "/login" ? true : false;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);
  const auth = getAuth();

  function validation(fieldName, value) {
    switch (fieldName) {
      case "email":
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

      case "password":
        return value.length >= 6;

      default:
        break;
    }
  }

  function ctaClickHandler(e) {
    e.preventDefault();

    if (!validation("email", email) || !validation("password", pass)) {
      setIsEmailValid(validation("email", email));
      setIsPassValid(validation("password", pass));
      return;
    }
    if (page) {
      signInWithEmailAndPassword(auth, email, pass)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (email) {
            setIsEmailExist(true);
          } else {
            setUserExist(true);
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          setIsEmailUsed(true);
        });
    }
  }

  useEffect(() => {
    setIsEmailValid(true);
    setIsPassValid(true);
    setUserExist(false);
    setIsEmailExist(false);
    setIsEmailUsed(false);
  }, [location]);

  function emailOnChangeHandler(e) {
    setEmail(e.target.value);
  }
  function passOnChangeHandler(e) {
    setPass(e.target.value);
  }
  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page === true ? "Sign in" : "Register"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            type="email"
            placeholder="Email"
            onChange={emailOnChangeHandler}
          />
          {!isEmailValid && (
            <p className="text-danger">Email is Invalid/Blank</p>
          )}
          <input
            className="form-control"
            value={pass}
            type="password"
            placeholder="Password"
            onChange={passOnChangeHandler}
          />
          {!isPassValid && (
            <p className="text-danger">Password is Invalid/Blank</p>
          )}

          <button
            onClick={ctaClickHandler}
            className="btn btn-danger btn-block"
          >
            {page === true ? "Sign in" : "Register"}
          </button>
          <br />

          {page && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              >
                Remember Me
              </label>
            </div>
          )}
        </form>
        <br />

        {isUserExist && (
          <p className="text-danger">User does not exist | Go for Sign up</p>
        )}
        {isEmailExist && (
          <p className="text-danger">Check your password | Go for Sign up</p>
        )}
        {isEmailUsed && (
          <p className="text-danger">Email already in use | Go for Sign in</p>
        )}

        <div className="login-form-other">
          <div className="login-signup-now">
            {page === true ? "New to NetFlix?" : "Existing user? "}
            <Link to={page ? "/register" : "/login"}>
              {page === true ? " Sign up now" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
}

export default Login;

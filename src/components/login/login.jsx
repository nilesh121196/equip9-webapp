import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { fetchUserData } from "./loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [userCred, setUserCred] = useState({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const goToRegistration = () => {
    navigate("/newuser");
  };
  const loginTo = () => {
    dispatch(fetchUserData(userCred));
    navigate("/dashboard");
  };

  const updateDetail = (e, key) => {
    let userCredC = JSON.parse(JSON.stringify(userCred));
    userCredC[`${key}`] = e.target.value;
    setUserCred(userCredC);
  };

  return (
    <div className={`container ${style.maxWidth30}`}>
      <div className="row">
        <div className="col-md-12">
          <p className={`mb-0 ${style.loginLabel}`}>Login</p>
        </div>
        <div className="container col-md-12">
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            value={userCred.email}
            onChange={(e) => {
              updateDetail(e, "email");
            }}
            required
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            value={userCred.pass}
            onChange={(e) => {
              updateDetail(e, "pass");
            }}
            required
          />

          <button type="submit" onClick={loginTo}>
            Login
          </button>

          <button className={style.registerButton} onClick={goToRegistration}>
            New! Register with us!
          </button>
        </div>
      </div>
      {/* <button onClick={goToRegistration}>click to go registration</button> */}
    </div>
  );
};

export default Login;

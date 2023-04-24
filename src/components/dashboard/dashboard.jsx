import React, { useEffect, useState } from "react";
import {
  faCloudArrowUp,
  faHourglassStart,
  faOutdent,
  faIndent,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import style from "./dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  loginUserDetailsObject,
  loginUserImageObject,
} from "../login/loginSlice";

const Dashboard = () => {
  const [userData, setuserdata] = useState({}); //useSelector(loginUserDetailsObject);
  const [userImage, setuserimage] = useState(""); //= useSelector(loginUserImageObject);
  const imageInRedux = useSelector(loginUserImageObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser") !== null) {
      setuserdata(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, [localStorage.getItem("currentUser")]);

  useEffect(() => {
    if (imageInRedux !== null) {
      setuserimage(imageInRedux);
    } else {
      setuserimage(localStorage.getItem("currentUserImage"));
    }
  }, [imageInRedux]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserImage");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <p className={`mb-0 ${style.title}`}>Hey, {userData?.first_name}</p>
          <p className={`mb-0 ${style.title}`}>Good Morning</p>
          <img
            src={userImage}
            alt="image not loaded"
            className={style.profileImage}
          />
        </div>
        <div className="col-md-3">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

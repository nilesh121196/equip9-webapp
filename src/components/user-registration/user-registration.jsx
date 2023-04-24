import React, { useEffect, useState } from "react";
import {
  faCloudArrowUp,
  faHourglassStart,
  faOutdent,
  faIndent,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./user-registration.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveUserToLocalStorage } from "./userRegistrationSlice";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userDetail = useSelector(userDetailObject);
  const [userDetail, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    sha256_password: "",
    phone: "",
    key: new Date().getTime(),
    photo: {},
  });

  const onRegistration = () => {
    dispatch(saveUserToLocalStorage(userDetail));
    navigate("/login");
  };

  const updateDetail = (e, key) => {
    let userDetailC = JSON.parse(JSON.stringify(userDetail));

    if (key === "photo") {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = (rr) => {
        let blobData = new Blob([rr.currentTarget.result], {
          type: file.type,
        });
        console.log(blobData);
        // userDetailC[`${key}`] = reader.result;
        userDetailC[`${key}`] = {
          fileName: file.name,
          blob: blobData,
        };
        setUserDetail(userDetailC);
      };
    } else {
      userDetailC[`${key}`] = e.target.value;
      setUserDetail(userDetailC);
    }
  };

  return (
    <div className={`container ${style.maxWidth30}`}>
      <div className="row">
        <div className="col-md-12">
          <div className={style.container}>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>

            <label htmlFor="fname">
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="fname"
              id="fname"
              value={userDetail.first_name}
              onChange={(e) => updateDetail(e, "first_name")}
              required
            />

            <label htmlFor="lname">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lname"
              id="lname"
              value={userDetail.last_name}
              onChange={(e) => updateDetail(e, "last_name")}
              required
            />

            <label htmlFor="mnumber">
              <b>Mobile Number</b>
            </label>
            <input
              type="text"
              maxLength={10}
              placeholder="Enter Mobile Number"
              name="mnumber"
              id="mnumber"
              value={userDetail.phone}
              onChange={(e) => updateDetail(e, "phone")}
              required
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              value={userDetail.email}
              onChange={(e) => updateDetail(e, "email")}
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="psw"
              value={userDetail.sha256_password}
              onChange={(e) => updateDetail(e, "sha256_password")}
              required
            />

            <label htmlFor="pfile">
              <b>Profile Picture</b>
            </label>
            <input
              type="file"
              placeholder="Upload Profile"
              name="pfile"
              id="pfile"
              onChange={(e) => updateDetail(e, "photo")}
              required
            />

            <button onClick={onRegistration} className={style.registerbtn}>
              Register
            </button>
          </div>

          <div className={`${style.container} ${style.signin}`}>
            <p>
              Already have an account? <a href="/login">Sign in</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;

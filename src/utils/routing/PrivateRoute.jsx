import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { loginUserDetailsObject } from "../../components/login/loginSlice";

// const checkAuth = () => {
//   const authCheck = useSelector(loginUserDetailsObject);
//   if (authCheck !== null) {
//     return true;
//   } else {
//     return false;
//   }
// };

const PrivateRoute = (props) => {
  let auth = false;
  const authCheck = localStorage.getItem("currentUser"); //   useSelector(loginUserDetailsObject);

  if (authCheck !== null) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

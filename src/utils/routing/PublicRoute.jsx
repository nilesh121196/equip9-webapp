import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { loginUserDetailsObject } from "../../components/login/loginSlice";

// const CheckAuth = () => {
//   const authCheck = useSelector(loginUserDetailsObject());
//   console.log(authCheck);
//   if (authCheck !== null) {
//     return true;
//   } else {
//     return false;
//   }
// };

const PublicRoute = (props: any) => {
  let auth = false;
  const authCheck = localStorage.getItem("currentUser");
  if (authCheck !== null) {
    auth = true;
  }

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;

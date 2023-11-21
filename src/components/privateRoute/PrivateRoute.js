import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isStudent } from "../../utils";

// Allow all the admin access
// If student role then, studentAccess flag has to be true
function PrivateRoute({ children, studentAccess = false }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo?.uid && (!isStudent(userInfo) || studentAccess === true) ? children : <Navigate to="/login" />;
}
export default PrivateRoute;

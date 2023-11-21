import "bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { auth } from "./config/firebase-config";
import AdminSignUP from "./pages/auth/AdminSignUp";
import Login from "./pages/auth/Login";
import AddBook from "./pages/books/AddBook";
import Books from "./pages/books/Books";
import EditBook from "./pages/books/EditBook";
import Clients from "./pages/clients/Clients";
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/history/History";
import Home from "./pages/home/Home";
import { getUserInfoAction } from "./redux/auth/authAction";
import BookLanding from "./pages/books/BookLanding";
import ResetPassword from "./pages/auth/ResetPassword";
import PublicSignUp from "./pages/auth/PublicSignUp";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      dispatch(getUserInfoAction(uid));
    } else {
      // User has signed out
    }
  });
  return (
    <div>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/book/:id" element={<BookLanding />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/sign-up" element={<PublicSignUp />}></Route>

        {/* Private */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin-signup"
          element={
            <PrivateRoute>
              <AdminSignUP />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/add-book"
          element={
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/edit-book/:id"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/history"
          element={
            <PrivateRoute studentAccess={true}>
              <History />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        ></Route>

        {/* Default Route */}
        <Route path="/*" element={<Home />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

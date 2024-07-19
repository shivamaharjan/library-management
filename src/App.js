import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/auth/Login";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

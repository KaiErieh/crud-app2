import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Administration from "./pages/Administration";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthGU, AuthU } from "./middleware/Auth"


function App() {
  return (
    <>

      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<AuthGU el={<Dashboard />} />} />
            <Route path="/admin" element={<AuthU el={<Administration />} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

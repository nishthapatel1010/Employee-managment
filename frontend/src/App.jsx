import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
// import Dashboard from "./pages/Dashboard";

// Simple private route component to protect dashboard
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // token stored on login
//   return token ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
        {/* Redirect root to login */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

// Private route wrapper
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // check if logged in
//   return token ? children : <Navigate to="/signin" />;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        
        {/* Protected Dashboard Route */}
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <Dashboard />
            // </PrivateRoute>
          }
        />

        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;

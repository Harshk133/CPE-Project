import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import Signupform from "./components/Signupform";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;


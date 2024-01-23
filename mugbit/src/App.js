import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import Signupform from "./components/Signupform";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import FileUpload from "./components/FileUpload";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signupform />} />
            <Route path="/page" element={<PrivateRoute />}>
              <Route path="homepage" element={<Home />} />
              <Route path="formpage" element={<Form />} />
              <Route path="profilepage" element={<Profile />} />
              <Route path="uploadpage" element={<FileUpload />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

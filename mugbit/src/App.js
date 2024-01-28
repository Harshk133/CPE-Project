import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import Signupform from "./components/Signupform";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import FileUpload from "./components/FileUpload";
import Sidebar from "./components/Sidebar";
import OtherUserProfile from "./components/OtherUserProfile";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userData, setUserData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function fetchUserData(token) {
    try {
      // Replace 'your-server-endpoint' with the actual server endpoint
      const response = await fetch('/api/users/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
          // Add other headers if needed
        }
      });

      if (response.ok) {
        const user = await response.json();
        setUserData(user);
        console.log("my user>>>", user);
      } else {
        // Handle errors
        console.log('Error fetching user data');
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Fetch error:', error);
    }
  }

  const toggleMenuCallback = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'your-token-key' with the actual key

    if (token) {
      decodeToken(token);
      fetchUserData(token);
    } else {
      // Handle the case where there's no token
      console.log('else case goes here....');
    }
  }, []);

  function decodeToken(token) {
    try {
      const decoded = jwtDecode(token); // Assuming you have jwt_decode installed
      setUserData(decoded);
      console.log(decoded);
    } catch (error) {
      // Handle decoding errors
      console.error('Token decoding error:', error);
    }
  }

  // Logout!
  const handleLogout = () => {
    // Clear user data from state and local storage
    setUserData({});
    localStorage.removeItem('token');
    // Redirect to the login page
    return <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <div style={{ display: "flex" }}>
          {/* <Sidebar user={userData} /> */}
          {userData && userData.username && <Sidebar user={userData} onLogout={handleLogout} toggleMenuCallback={toggleMenuCallback} />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signupform />} />
            <Route path="/page" element={<PrivateRoute />}>
              <Route path="homepage" element={<Home user={userData} isMenuOpen={isMenuOpen} />} />
              <Route path="formpage" element={<Form />} />
              <Route path="profilepage" element={<Profile user={userData} />} />
              <Route path="oprofilepage/:username" element={<OtherUserProfile user={userData} />} />
              <Route path="uploadpage" element={<FileUpload user={userData} />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

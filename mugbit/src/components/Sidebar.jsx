// import React, { useState, useEffect } from 'react';
import React from 'react';
// import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHome, cilUser, cilUnderline, cilCloudUpload, cilAccountLogout } from '@coreui/icons';

function Sidebar({ user, onLogout }) {
    // const [userData, setUserData] = useState({});

    // async function fetchUserData(token) {
    //     try {
    //         // Replace 'your-server-endpoint' with the actual server endpoint
    //         const response = await fetch('/api/users/login', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //                 // Add other headers if needed
    //             }
    //         });

    //         if (response.ok) {
    //             const user = await response.json();
    //             setUserData(user);
    //             console.log("my user>>>", user);
    //         } else {
    //             // Handle errors
    //             console.log('Error fetching user data');
    //         }
    //     } catch (error) {
    //         // Handle fetch errors
    //         console.error('Fetch error:', error);
    //     }
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem('token'); // Replace 'your-token-key' with the actual key

    //     if (token) {
    //         decodeToken(token);
    //         fetchUserData(token);
    //     } else {
    //         // Handle the case where there's no token
    //         console.log('else case goes here....');
    //     }
    // }, []);

    // function decodeToken(token) {
    //     try {
    //         const decoded = jwtDecode(token); // Assuming you have jwt_decode installed
    //         setUserData(decoded);
    //         console.log(decoded);
    //     } catch (error) {
    //         // Handle decoding errors
    //         console.error('Token decoding error:', error);
    //     }
    // }

    return (
        <>
            <div style={{ border: '1px solid black', height: "100vh", width: "30%", padding: "27px" }}>
                <nav style={{ lineHeight: "40px" }}>
                    <big><b>hey {user.username}🙋‍♂️</b></big>
                    <br />
                    <ul style={{ listStyle: 'none', padding: "4px" }}>
                        <li style={{ display: "flex" }}>
                            <CIcon icon={cilHome} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/page/homepage" style={{ color: "orange", fontWeight: "bold" }}>Home</Link>
                        </li>
                        <li>
                            <CIcon icon={cilUser} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/page/profilepage" style={{ color: "orange", fontWeight: "bold" }}>Profile</Link>
                        </li>
                        <li>
                            <CIcon icon={cilUnderline} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/page/formpage" style={{ color: "orange", fontWeight: "bold" }}>Form</Link>
                        </li>
                        <li>
                            <CIcon icon={cilCloudUpload} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/page/uploadpage" style={{ color: "orange", fontWeight: "bold" }}>Upload Document</Link>
                        </li>
                        {/* <li>
                            <CIcon icon={cilHome} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/signup" style={{ color: "orange" }}>Signup</Link>
                        </li>                         */}
                        <li>
                            <CIcon icon={cilAccountLogout} size="sm" style={{ width: "20px", marginRight: "7px" }} />
                            <Link to="/login" style={{ color: "orange", fontWeight: "bold" }} onClick={onLogout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar

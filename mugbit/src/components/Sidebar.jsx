import React from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {

    return (
        <>
            <div style={{ border: '1px solid black', height: "100vh", width: "15%" }}>
                <nav>
                    hey 🙋‍♂️
                    <ul style={{ listStyle: 'none', padding: "4px" }}>
                        <li>
                            <Link to="/page/homepage" style={{ color: "orange" }}>Home</Link>
                        </li>
                        <li>
                            <Link to="/page/formpage" style={{ color: "orange" }}>Form</Link>
                        </li>
                        <li>
                            <Link to="/page/uploadpage" style={{ color: "orange" }}>Upload Document</Link>
                        </li>
                        <li>
                            <Link to="/signup" style={{ color: "orange" }}>Signup</Link>
                        </li>
                        <li>
                            <Link to="/page/profilepage" style={{ color: "orange" }}>Profile</Link>
                        </li>
                        <li>
                            <Link to="/login" style={{ color: "orange" }}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar

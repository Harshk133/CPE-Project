import React from 'react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHome, cilUser, cilUnderline, cilCloudUpload, cilAccountLogout } from '@coreui/icons';

function Sidebar() {
    return (
        <>
            <div style={{ border: '1px solid black', height: "100vh", width: "30%", padding: "27px" }}>
                <nav style={{ lineHeight: "40px" }}>
                    <big><b>hey 🙋‍♂️</b></big>
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
                            <Link to="/login" style={{ color: "orange", fontWeight: "bold" }}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar

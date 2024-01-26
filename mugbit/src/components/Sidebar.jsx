// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import {
    cilHome, cilUser, cilUnderline, cilCloudUpload, cilAccountLogout, cilApplications, cilBorderAll
} from '@coreui/icons';
import "./css/Sidebar.css";

function Sidebar({ user, onLogout, toggleMenuCallback }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        const updatedMenuState = !isMenuOpen;
        setIsMenuOpen(updatedMenuState);
        toggleMenuCallback(updatedMenuState); // Notify the parent component about the state change
    };

    return (
        <>
        
            <div id ='navbar-container' className={`navbar-container ${isMenuOpen ? 'menu-open' : ''}`}>
                <nav className='navbar'>
                    <div className='row-container'>
                        <div className="row-1">
                            <ul>
                                <li className="hamburger-icon" onClick={toggleMenu}>
                                    {/* <img src="/hamburger.png" alt="logo" className='icons hamburger' /> */}
                                    <CIcon icon={cilBorderAll} size="sm" className='icons' style={{pointer: "cursor"}} />
                                </li>
                                <li>
                                    <Link to="/page/homepage">
                                        <CIcon icon={cilHome} size="sm" className='icons' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/page/profilepage">
                                        <CIcon icon={cilUser} size="sm" className='icons' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/page/formpage">
                                        <CIcon icon={cilUnderline} size="sm" className='icons' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/page/uploadpage">
                                        <CIcon icon={cilCloudUpload} size="sm" className='icons' />
                                    </Link>
                                </li>
                                <li>
                                    <CIcon icon={cilApplications
                                    } size="sm" className='icons' />
                                </li>
                                <li>
                                    <Link to="/login" onClick={onLogout}>
                                        <CIcon icon={cilAccountLogout} size="sm" className='icons' />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="row-2">
                            <ul>
                                <li>
                                    <Link><big><b>hey 🙋‍♂️ {user.username}</b></big></Link>
                                </li>
                                <li>
                                    <Link>Home</Link>
                                </li>
                                <li>
                                    <Link>Profile</Link>
                                </li>
                                <li>
                                    <Link>Form</Link>
                                </li>
                                <li>
                                    <Link>Upload</Link>
                                </li>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                <li>
                                    <Link>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Sidebar

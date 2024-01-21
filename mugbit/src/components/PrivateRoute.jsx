import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    const loggedIn = !!localStorage.getItem('token');
    if (loggedIn) {
        return <Outlet />;
    }else{
        return <Navigate to={"/login"} />;
    }
}

export default PrivateRoute;

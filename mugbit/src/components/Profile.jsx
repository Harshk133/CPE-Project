import React from 'react'
import Sidebar from './Sidebar';

function Profile() {
  return (
    <div style={{display: "flex"}}>
        <Sidebar/>
      <div>
        User Profile!
      </div>
    </div>
  )
}

export default Profile;

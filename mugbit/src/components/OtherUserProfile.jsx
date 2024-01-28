// components/OtherUserProfile.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OtherUserProfile() {
    const [profileUser, setProfileUser] = useState({});
    const { username } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Replace 'your-server-endpoint' with the actual server endpoint
        const response = await fetch(`/api/users/profile/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            // Add other headers if needed
          }
        });

        if (response.ok) {
          const profileUserData = await response.json();
          setProfileUser(profileUserData);
          console.log("Profile user data:", profileUserData);
        } else {
          // Handle errors
          console.log('Error fetching profile data');
        }
      } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error);
      }
    };

    fetchProfileData();
  }, [username]); // Ensure the effect runs when the userId changes

  return (
    <div>
      <h2>Profile Page</h2>
      {profileUser.username && (
        <div>
          <p>Username: {profileUser.username}</p>
          <p>Email: {profileUser.email}</p>
          <img src={`http://localhost:7000/uploads/images/${profileUser.userimg}`} alt="this is an image" style={{ width: "70%", borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
}

export default OtherUserProfile;

import React from 'react';

function Profile({ user }) {
  return (
    <div style={{ display: "flex" }}>
      <div>
        {user.username}!
        <br />
        {user.email}
        {user && (
          <div>
            <p>Welcome, {user.username}!</p>
            {user.userimg ? (
              <img src={`${user.userimg}`} alt="User" style={{ width: "27%", borderRadius: "10px" }} />
            ) : (
              <img src="/placeholderimg.png" alt="Default User" style={{ width: "27%", borderRadius: "10px" }} />
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile;

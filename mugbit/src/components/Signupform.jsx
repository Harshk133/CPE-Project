import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signupform() {
    // Hooks are comes here...
    const [username, setUserName] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");

    // funciton for posting the form data!
    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = {
            username,
            useremail,
            password
        };

        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle successful registration, e.g., redirect or show a success message
                alert("Ye, Successfully signin!");
              } else {
                // Handle registration failure, e.g., show an error message
                alert("ERROR 🌋");
              }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="username">Enter Your Username</label>
                    <input type="text" value={username} 
                    onChange={(e) => setUserName(e.target.value)} id='username' />
                </div>

                <div>
                    <label htmlFor="useremail">Enter Your Email</label>
                    <input type="email" value={useremail} onChange={(e) => setUserEmail(e.target.value)} id='useremail' />
                </div>

                <div>
                    <label htmlFor="userpassword">Enter Your Password</label>
                    <input type="password" value={password}
                    onChange={(e) => setUserPassword(e.target.value)} id='userpassword' />
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Signupform

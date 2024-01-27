import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Signupform() {
    // Hooks are comes here...
    const [username, setUserName] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [picture, setUserPicture] = useState(null);
    const navigate = useNavigate();

    // funciton for posting the form data!
    const handleSignUp = async (e) => {
        e.preventDefault();

        // const formData = {
        //     username,
        //     useremail,
        //     password,
        //     picture
        // };

        const formData = new FormData();
        formData.append("username", username);
        formData.append("useremail", useremail);
        formData.append("password", password);
        formData.append("picture", picture);

        console.log(picture);
        console.log(formData);

        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(formData)
                body: formData
            });

            if (response.ok) {
                // Handle successful registration, e.g., redirect or show a success message
                // alert("Ye, Successfully signin!");
                navigate("/login");
                console.log("You Clicked!")
            } else {
                // Handle registration failure, e.g., show an error message
                alert("ERROR 🌋");
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    return (
        <div style={{ margin: "0", padding: 0, boxSizing: "border-box", overflowY: 'hidden', overflowX: 'hidden' }}>
            <img src="/bg.jpg" alt="background-img" style={{ width: "100vw", objectFit: "cover", position: "relative", zIndex: 1, overflowY: 'hidden', overflowX: 'hidden', height: "100vh" }} />

            <Form onSubmit={handleSignUp} style={{ position: "relative", zIndex: 10, top: "-570px", width: "70%", margin: "0 auto", height: "100vh" }}>
                <h2>Signin To MugBit!</h2>
                <p style={{ width: "170px", height: "2px", background: "orange" }}></p>
                <Form.Group>
                    <Form.Label>Enter Your Username</Form.Label>
                    <Form.Control type="text" value={username}
                        onChange={(e) => setUserName(e.target.value)} id='username' placeholder="Enter User name" />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control type="email" value={useremail} onChange={(e) => setUserEmail(e.target.value)} id='useremail' placeholder="Enter Email" />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Choose Your Profile Picture!</Form.Label>
                    <Form.Control
                        type="file"
                        id="userpic"
                        accept="image/*"
                        onChange={(e) => setUserPicture(e.target.files[0])}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control type="password" value={password}
                        onChange={(e) => setUserPassword(e.target.value)} id='userpassword' placeholder="Enter Password" />
                </Form.Group>
                <br />
                <Button type="submit" style={{ outline: "orange", border: "none", background: "orange" }}>
                    Sign in ✌
                </Button>

                <center>Already Have Account? <Link to="/login">Login</Link></center>
            </Form>

        </div>
    )
}

export default Signupform

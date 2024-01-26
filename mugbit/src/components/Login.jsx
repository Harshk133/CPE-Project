import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login
                const data = await response.json();

                // Store the token in local storage
                localStorage.setItem('token', data.token);
                navigate('/page/homepage');
            } else {
                // Handle authentication error
                const data = await response.json();
                setError(data.message);
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Internal Server Error');
        }
    };

    return (
        <div style={{ margin: "0", padding: 0, boxSizing: "border-box", overflowY: 'hidden', overflowX: 'hidden' }}>
           <img src="/bg.jpg" alt="background image" style={{ width: "100vw", objectFit: "cover", position: "relative", zIndex: 1, overflowY: 'hidden', overflowX: 'hidden', height: "100vh" }} />
            <Form style={{ position: "relative", zIndex: 10, top: "-510px", width: "70%", margin: "0 auto", height: "100vh" }}>
                <h2>Login To MugBit!</h2>
                <Form.Label>{error && <p style={{ color: 'red' }}>{error}</p>}</Form.Label>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>

                <Button type="button" onClick={handleLogin} style={{ outline: "orange", border: "none", background: "orange" }}>
                    Login 👍
                </Button>

                <center>Don't Have Account Yet!? <Link to="/signup">Sign Up</Link></center>
            </Form>
        </div>
    );
};

export default LoginPage;

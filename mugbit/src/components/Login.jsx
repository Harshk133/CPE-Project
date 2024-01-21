import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Login</h2>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="button" onClick={handleLogin}>
                    Log In
                </button>
                <Link to="/signup">Sign Up</Link>
            </form>
        </div>
    );
};

export default LoginPage;

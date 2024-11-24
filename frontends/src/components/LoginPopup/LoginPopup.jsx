import React, { useState, useContext, useEffect } from 'react';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, token } = useContext(StoreContext);  // Use the token from context
    const [currState, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // Hide the login popup if the user is already logged in
    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            setShowLogin(false); // Automatically close the popup if logged in
            navigate('/dashboard'); // Redirect to dashboard if logged in
        }
    }, [token, setShowLogin, navigate]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let apiUrl = 'http://localhost:4000';
        apiUrl += currState === 'Login' ? '/api/user/login' : '/api/user/register';

        try {
            const response = await axios.post(apiUrl, data);

            if (response.data.success) {
                setToken(response.data.token);  // Save the token to context
                localStorage.setItem('token', response.data.token);  // Save the token to localStorage
                localStorage.setItem('username', data.name); // Save username to localStorage
                
                // Logging the data saved in localStorage
                console.log("This is my user in localStorage: ", {
                    token: localStorage.getItem('token'),
                    username: localStorage.getItem('username')
                });

                setShowLogin(false);
                navigate('/dashboard');
                alert(currState === 'Sign Up' ? 'Registration successful!' : 'Login successful!');
            } else {
                alert(response.data.message || 'Error occurred.');
            }
        } catch (error) {
            console.error('API error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Sign Up' && (
                        <input
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder="Name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">{currState}</button>
                <p>
                    {currState === 'Login'
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                    <span onClick={() => setCurrState(currState === 'Login' ? 'Sign Up' : 'Login')}>
                        {currState === 'Login' ? 'Sign Up' : 'Login'}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;

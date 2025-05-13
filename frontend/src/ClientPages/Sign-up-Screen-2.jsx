import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpScreen2() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // error message storage
    const [showError, setShowError] = useState(false); // To control error visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error message

        // Get data from first step
        const signupData = JSON.parse(sessionStorage.getItem('signupData'));
        if (!signupData) {
            navigate('/sign-up-screen-1');
            return;
        }

        // Password validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setShowError(true); // Show error notification
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setShowError(true); // Show error notification
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...signupData,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Sign up failed');
            }

            // Clear signup data
            sessionStorage.removeItem('signupData');

            // Redirect to home or success page
            navigate('/home-page');
        } catch (err) {
            setError(err.message);
            setShowError(true); // Show error notification for server errors
        }
    };

    const closeErrorPopup = () => {
        setShowError(false); // Close the error notification
    };

    return (
        <div className="sign-in-bg">
            <div className="sign-in-box">
                <div className="sign-in-left">
                    <div className="text-content">
                        <h1 className="sign-in-title">Sign up</h1>
                        <p className="sign-in-tagline">Mabuhay Ka-Harvest! Gumawa ng Account dito:</p>
                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <label htmlFor="password" className="sign-in-label">PASSWORD</label>
                            <input
                                type="password"
                                id="password"
                                className="sign-in-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="confirm-password" className="sign-in-label">CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="sign-in-input"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="sign-in-btn">SIGN UP</button>
                        </form>
                    </div>
                    <img src={Logo} className="sign-up-logo-1" alt="Harvest Logo" />
                </div>
                <div className="sign-in-right">
                    <img src={Image} className="sign-in-image" alt="Sign Up Visual" />
                </div>
            </div>
            
            {showError && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{error}</p>
                        <button onClick={closeErrorPopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUpScreen2;

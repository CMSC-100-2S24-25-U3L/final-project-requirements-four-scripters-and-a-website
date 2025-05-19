import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpScreen2() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const signupData = JSON.parse(sessionStorage.getItem('signupData'));

        if (!signupData) {
            navigate('/sign-up-screen-1');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setShowError(true);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setShowError(true);
            return;
        }

        try {
            const userData = {
                ...signupData,
                password,
            };

            await signup(userData); // This should handle everything

            sessionStorage.removeItem('signupData');
            navigate('/sign-in-screen');
        } catch (err) {
            setError(err.message || 'Signup failed');
            setShowError(true);
        }
    };

    const closeErrorPopup = () => {
        setShowError(false);
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

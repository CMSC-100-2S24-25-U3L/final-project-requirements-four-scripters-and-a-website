import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpScreen2() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // error message storage
    const [showError, setShowError] = useState(false); // To control error visibility
    const navigate = useNavigate();
    const { signup } = useAuth();

    console.log('[SignUpScreen2] Rendering with state:', { password, confirmPassword, error });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[SignUpScreen2] Form submitted');
        setError('');
        
        // get form data stored from the previous step
        const signupData = JSON.parse(sessionStorage.getItem('signupData'));
        console.log('[SignUpScreen2] Retrieved signupData from sessionStorage:', signupData);
        
        // if data is missing, send user back to step 1
        if (!signupData) {
            console.log('[SignUpScreen2] No signupData found - redirecting to step 1');
            navigate('/sign-up-screen-1');
            return;
        }

        // check if passwords match and are long enough
        if (password !== confirmPassword) {
            console.log('[SignUpScreen2] Passwords do not match');
            setError('Passwords do not match');
            setShowError(true); // Show error notification
            return;
        }

        if (password.length < 8) {
            console.log('[SignUpScreen2] Password too short');
            setError('Password must be at least 8 characters');
            setShowError(true); // Show error notification
            return;
        }

        try {

            // merge stored data with new password
            const userData = {
                ...signupData,
                password
            };
            
            console.log('[SignUpScreen2] Attempting signup with data:', userData);
            
            // call the signup function from AuthContext
            await signup(userData);
            
            console.log('[SignUpScreen2] Signup successful - clearing sessionStorage');

//             const response = await fetch('http://localhost:3000/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     ...signupData,
//                     password
//                 }),
//             });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Sign up failed');
            }

            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);

            // Clear signup session data
            sessionStorage.removeItem('signupData');
            
            // after signup, send user to login page
            console.log('[SignUpScreen2] Navigating to /sign-in-screen');
            navigate('/sign-in-screen');
        } catch (err) {
            console.error('[SignUpScreen2] Signup error:', err);
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

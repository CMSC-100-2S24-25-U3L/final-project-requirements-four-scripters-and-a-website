import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';

function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div className="sign-in-bg">
            <div className="sign-in-box">
                <div className="sign-in-left">
                    <div className="text-content">
                        <h1 className="sign-in-title">Sign up</h1>
                        <p className="sign-in-tagline">Mabuhay Ka-Harvest! Gumawa ng Account dito:</p>
                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="sign-in-label">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                className="sign-in-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
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
        </div>
    );
}

export default SignUpScreen;

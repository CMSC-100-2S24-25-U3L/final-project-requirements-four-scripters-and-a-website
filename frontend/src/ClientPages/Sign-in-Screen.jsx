import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div className="sign-in-bg">
            <div className="sign-in-box">
                <div className="sign-in-left">
                    <img src={Logo} className="sign-in-logo" alt="Harvest Logo" />
                    <div className="text-content">
                        <h1 className="sign-in-title">Sign in</h1>
                        <p className="sign-in-tagline">Mabuhay Ka-Harvest! Mag-login!</p>
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
                            <button type="submit" className="sign-in-btn">SIGN IN</button>
                        </form>
                    </div>
                    <div className="sign-in-footer">
                        <span>Don't have an account? </span>
                        <a href="#" className="sign-up-link" onClick={() => navigate('/sign-up-screen-1')}>Sign up now!</a>
                    </div>
                </div>
                <div className="sign-in-right">
                    <img src={Image} className="sign-in-image" alt="Sign In Visual" />
                </div>
            </div>
        </div>
    );
}

export default SignInScreen;

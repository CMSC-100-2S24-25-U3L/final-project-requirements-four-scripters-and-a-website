import '../css/sign-up-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function SignUpScreen1() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // basic validation
        if (!email || !firstName || !lastName) {
            setError('Please fill in all required fields');
            return;
        }

        // store in session storage and proceed to next step
        sessionStorage.setItem('signupData', JSON.stringify({
            email,
            firstName,
            middleName,
            lastName
        }));
        navigate('/sign-up-screen-2');
    };
    
    return (
        <div className="sign-up-bg">
            <div className="sign-up-box">
                <div className="sign-up-left">
                    <img src={Logo} className="sign-up-logo" alt="Harvest Logo" />
                    <div className="text-content">
                        <h1 className="sign-up-title">Sign Up - Step 1</h1>
                        <p className="sign-up-tagline">Mabuhay Ka-Harvest! Gumawa ng Account dito:</p>
                        {error && <p className="error-message">{error}</p>}
                        <form className="sign-up-form" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="sign-up-label">EMAIL*</label>
                            <input
                                type="email"
                                id="email"
                                className="sign-up-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="firstName" className="sign-up-label">FIRST NAME*</label>
                            <input
                                type="text"
                                id="firstName"
                                className="sign-up-input"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                            <label htmlFor="middleName" className="sign-up-label">MIDDLE NAME</label>
                            <input
                                type="text"
                                id="middleName"
                                className="sign-up-input"
                                value={middleName}
                                onChange={e => setMiddleName(e.target.value)}
                            />
                            <label htmlFor="lastName" className="sign-up-label">LAST NAME*</label>
                            <input
                                type="text"
                                id="lastName"
                                className="sign-up-input"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                            <button type="submit" className="sign-up-btn">NEXT</button>
                        </form>
                    </div>
                </div>
                <div className="sign-up-right">
                    <img src={Image} className="sign-up-image" alt="Sign Up Visual" />
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen1;
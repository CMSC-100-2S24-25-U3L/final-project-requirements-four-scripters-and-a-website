import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';

function SignUpScreen() {
    const [fname, setFname] = useState('');
    const [midname, setMidname] = useState('');
    const [lastname, setLastname] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div className="sign-in-bg">
            <div className="sign-in-box">
                <div className="sign-in-left">
                    <div className="text-content">
                        <h1 className="sign-in-title">Sign up</h1>
                        <p className="sign-in-tagline">Pakisagutan ang mga detalye sa ilalim:</p>
                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <label htmlFor="fname" className="sign-in-label">FIRST NAME</label>
                            <input
                                type="text"
                                id="fname"
                                className="sign-in-input"
                                value={fname}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="mid-name" className="sign-in-label">MIDDLE NAME</label>
                            <input
                                type="text"
                                id="mid-name"
                                className="sign-in-input"
                                value={midname}
                                onChange={e => setMidname(e.target.value)}
                            />
                            <label htmlFor="last-name" className="sign-in-label">LAST NAME</label>
                            <input
                                type="text"
                                id="last-name"
                                className="sign-in-input"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                required
                            />
                            <button type="submit" className="sign-in-btn" onClick={() => {}}>NEXT</button>
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

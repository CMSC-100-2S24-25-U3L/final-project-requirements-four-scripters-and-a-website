import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // import the auth context

function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    console.log('[SignInScreen] Rendering with state:', { email, error });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        

//         try {
//             console.log('[SignInScreen] Attempting login');
//             // call the login function from AuthContext
//             const user = await login(email, password);
//             console.log('[SignInScreen] Login successful, user:', user);
            
//             // navigate based on user type
//             const redirectPath = user.userType === 'merchant' 
//             ? '/admin-dashboard' 
//             : '/home-page';
            
//             console.log('[SignInScreen] Navigating to:', redirectPath);
//             navigate(redirectPath);

        try {   // api call
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })

            });

            // the user
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Sign in failed');
            }

            // Save the user's email and name in localStorage
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);

            // if no error, navigate to the appropriate screen
            if (data.userType === 'customer') {
                navigate('/home-page');
            } else if (data.userType === 'merchant') {
                navigate('/admin-dashboard');
            } else {
                // Default fallback
                navigate('/home-page');
            }

        } catch (err) {
            console.error('[SignInScreen] Login error:', {
            message: err.message,
            details: err.details,
            original: err.originalError
            });
            
            // display the most specific error message available
            setError(err.details || err.message || 'Login failed. Please try again.');
        }
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

            {error && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{error}</p>
                        <button onClick={() => setError('')}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignInScreen;

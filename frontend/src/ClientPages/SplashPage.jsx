import { useNavigate } from 'react-router-dom';
import HarvestLogoShadow from '../assets/harvest-logo-shadow.png';
import '../css/splash-page.css';
import Footer from '../components/Footer';

function SplashPage(props) {
    const navigate = useNavigate();
    return (
        <div className="splash">
            {/* <div className="splash-nav-bar">
                <img src={HarvestLogoWhite} className="nav-logo" alt="Harvest Logo" />
                <button className="splash-signin" onClick={() => {}}>SIGN IN</button>
            </div> */}

            <div className="logo-container">
                {/* <p className="welcome-text">WELCOME TO HARVEST</p> */}
                <img src={HarvestLogoShadow} className="shadow-logo" alt="Harvest Logo Shadow" />
                <button className="splash-signin" onClick={() => navigate('/sign-in-screen')}>SIGN IN</button>
            </div>

            <div className="space"></div>
            
            <div className="about-us-container">
                <h1 className="about-us-header">About Us</h1>
                <p className="harvest-desc">Harvest is an eCommerce platform developed in partnership with the Department of Agriculture to connect the nation's farmers to a wider market. Managed by the DA, the platform features carefully curated products straight from local producers, ensuring quality, traceability, and fair pricing. Consumers can explore a variety of farm-fresh goods while supporting the livelihoods of hardworking farmers—all in one trusted marketplace.</p>
            </div>

            <div className="space"></div>

            <Footer />
        </div>
    );
}

export default SplashPage;
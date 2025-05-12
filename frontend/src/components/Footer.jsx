import HarvestLogoWhite from '../assets/harvest-logo-white.png';
import '../css/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <img src={HarvestLogoWhite} className="footer-logo" alt="Harvest Logo" />
            <p className="footer-text">© 2025 Harvest. All rights reserved.</p>
        </footer>
    );
}


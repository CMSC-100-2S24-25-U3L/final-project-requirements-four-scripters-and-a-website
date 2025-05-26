import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HarvestLogoShadow from '../assets/harvest-logo-shadow.png';
import '../css/splash-page.css';
import Footer from '../components/Footer';
import farmer from '../assets/farmer.png';
import fresh from '../assets/fresh.png';
import simple from '../assets/simple.png';
import cod from '../assets/cod.png';
import fairPricingIcon from '../assets/fairPricing.png';
import ecoFriendlyIcon from '../assets/ecoFriendly.png';
import convenienceIcon from '../assets/convenience.png';
import trackingIcon from '../assets/tracking.png';


function SplashPage(props) {
    const navigate = useNavigate();
    const [flippedTiles, setFlippedTiles] = useState({});

    const offers = [
        {
            id: 'connect',
            img: farmer,
            alt: 'Connect',
            title: 'Connect You with Local Farmers',
            description: 'We bridge the gap between farmers and consumers, making fresh produce more accessible.'
        },
        {
            id: 'fresh',
            img: fresh,
            alt: 'Fresh',
            title: 'Fresh Produce at Your Fingertips',
            description: 'Enjoy farm-fresh fruits and vegetables delivered directly to your door.'
        },
        {
            id: 'simple',
            img: simple,
            alt: 'Simple',
            title: 'Smart & Simple Shopping',
            description: 'Our platform offers an easy and convenient shopping experience with a user-friendly interface.'
        },
        {
            id: 'cod',
            img: cod,
            alt: 'COD',
            title: 'Cash-on-Delivery Convenience',
            description: 'Pay securely upon delivery, no need for online payments upfront.'
        }
    ];

    const whyUseUs = [
        {
            id: 'fair-pricing',
            icon: fairPricingIcon,
            title: 'Fair and Transparent Pricing',
            description: 'No middlemen, so you pay a fair price every time.'
        },
        {
            id: 'eco-friendly',
            icon: ecoFriendlyIcon,
            title: 'Sustainable & Eco-Friendly',
            description: 'Promote environmentally responsible food sourcing and support local farmers.'
        },
        {
            id: 'convenience',
            icon: convenienceIcon,
            title: 'Convenient Shopping',
            description: 'Easy-to-use platform available anytime, anywhere for seamless purchasing.'
        },
        {
            id: 'tracking',
            icon: trackingIcon,
            title: 'Real-Time Order Tracking',
            description: 'Stay updated with your orders from purchase to delivery.'
        }
    ];

    const toggleFlip = (id) => {
        setFlippedTiles(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="splash">
            <div className="logo-container">
                <img src={HarvestLogoShadow} className="shadow-logo" alt="Harvest Logo Shadow" />
                <button className="splash-signin" onClick={() => navigate('/sign-in-screen')}>SIGN IN</button>
            </div>

            <div className="space"></div>

            <div className="about-us-container">
                <h1 className="about-us-header">ABOUT US</h1>
                <p className="harvest-desc">
                    Harvest is an eCommerce platform developed in partnership with the Department of Agriculture to connect the nation's farmers to a wider market. Managed by the DA, the platform features carefully curated products straight from local producers, ensuring quality, traceability, and fair pricing. Consumers can explore a variety of farm-fresh goods while supporting the livelihoods of hardworking farmers—all in one trusted marketplace.
                </p>
            </div>

            <div className="what-we-do-container">
                <div className="what-we-do-left">
                    <h1 className="what-we-do-header">What We Do</h1>
                </div>
                <div className="what-we-do-right">
                    {offers.map(({ id, img, alt, title, description }) => (
                        <div 
                            key={id} 
                            className={`offer-item flip-card ${id === 'connect' || id === 'cod' ? 'tile-yellow' : 'tile-green'} ${flippedTiles[id] ? 'flipped' : ''}`} 
                            onClick={() => toggleFlip(id)}
                        >
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img 
                                        src={img} 
                                        alt={alt} 
                                        className={`offer-icon${id === 'simple' ? '-simple' : id === 'cod' ? '-cod' : ''}`} 
                                    />
                                    <p className="offer-title">{title}</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="why-use-container">
                <h1 className="why-use-header">Why Work With Us?</h1>
                <div className="why-use-list">
                    {whyUseUs.map(({ id, icon, title, description }) => (
                        <div key={id} className="why-use-item">
                            <img src={icon} alt={title} className="why-use-icon" />
                            <div className="why-use-text">
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SplashPage;

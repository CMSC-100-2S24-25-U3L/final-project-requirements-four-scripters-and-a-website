import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <image src=""> </image>
      </div>
      <div className="nav-links">
        <Link to="/home-page" className="nav-link text-orange-500">
          <span>Market</span>
        </Link>
        <Link to="/cart" className="nav-link">
          <ShoppingCart size={18} />
          <span>Cart</span>
        </Link>
        <Link to="/profile" className="nav-link"> 
          <User size={18} />
          <span>View Profile</span>
        </Link>
      </div>
    </header>
  );
}
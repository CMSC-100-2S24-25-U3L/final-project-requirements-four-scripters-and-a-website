import { ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">
          <span className="logo-text">harvest</span>
          <span className="logo-icon">🌱</span>
        </h1>
      </div>
      <div className="nav-links">
        <a href="#" className="nav-link text-orange-500">
          <span>Market</span>
        </a>
        <a href="#" className="nav-link">
          <ShoppingCart size={18} />
          <span>Cart</span>
        </a>
        <a href="#" className="nav-link">
          <User size={18} />
          <span>View Profile</span>
        </a>
      </div>
    </header>
  );
}
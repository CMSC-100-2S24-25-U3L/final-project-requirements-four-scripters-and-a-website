import Logo from '../assets/harvest-logo-white.png';
import { ShoppingBag, Receipt, ChartBar, Users, LogOut} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/admin-header.css';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal'; 
import React, { useState } from 'react';

export default function AdminHeader() {
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to home 
  };

  return (
    <header className="admin-header">
      <div className="admin-logo-container">
        <Link to="/admin-dashboard">
            <img className="admin-nav-logo" src = {Logo}></img>
        </Link>
      </div>
      <div className="admin-nav-links">
        <Link to="/manage-products" className="admin-nav-link">
          <ShoppingBag size={18} className='admin-icon'/>
          <span className='admin-icon-text'>MANAGE PRODUCTS</span>
        </Link>
        
        <Link to="/manage-orders" className="admin-nav-link">
          < Receipt size={18} className='admin-icon'/>
          <span className='admin-icon-text'>MANAGE ORDERS</span>
        </Link>
        
        <Link to="/admin-dashboard" className="admin-nav-link">
          <ChartBar size={18} className='admin-icon'/>
          <span className='admin-icon-text'>SALES REPORTS</span>
        </Link>

        <Link to="/manage-users" className="admin-nav-link">
          <Users size={18} className='admin-icon'/>
          <span className='admin-icon-text'>MANAGE USERS</span>
        </Link>

        <button  className="admin-nav-link" id="admin-view-profile" onClick={() => setShowLogoutModal(true)}> 
          <LogOut size={18} className='admin-icon'/>
          <span className='admin-icon-text' >LOG OUT</span>
        </button>

        {showLogoutModal && (
          <ConfirmationModal
            title="Confirm Logout"
            message="Are you sure you want to logout?"
            confirmText="Logout"
            cancelText="Cancel"
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}
      </div>
    </header>
  );
}
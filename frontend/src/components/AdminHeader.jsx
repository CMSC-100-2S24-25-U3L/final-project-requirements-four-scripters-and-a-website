import Logo from '../assets/harvest-logo-white.png';
import { ShoppingBag, Receipt, ChartBar, Users, User} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/admin-header.css';

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-logo-container">
        <Link to="/admin-dashboard">
            <img className="nav-logo" src = {Logo}></img>
        </Link>
      </div>
      <div className="admin-nav-links">
        <Link to="/manage-products" className="nav-link">
          <ShoppingBag size={18} className='icon'/>
          <span className='icon-text'>MANAGE PRODUCTS</span>
        </Link>
        
        <Link to="/manage-orders" className="nav-link">
          < Receipt size={18} className='icon'/>
          <span className='icon-text'>MANAGE ORDERS</span>
        </Link>
        
        <Link to="/sales-report" className="nav-link">
          <ChartBar size={18} className='icon'/>
          <span className='icon-text'>SALES REPORTS</span>
        </Link>

        <Link to="/manage-users" className="nav-link">
          <Users size={18} className='icon'/>
          <span className='icon-text'>MANAGE USERS</span>
        </Link>

        <Link to="/admin-profile" className="nav-link" id="view-profile"> 
          <User size={18} className='icon'/>
          <span className='icon-text' >VIEW PROFILE</span>
        </Link>
      </div>
    </header>
  );
}
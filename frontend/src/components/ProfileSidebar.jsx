import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './ConfirmationModal'; 
import  { useState } from 'react';

export default function ProfileSidebar({ user, loading }) {
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to home 
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-avatar">
        <div className="avatar-placeholder"></div>
      </div>
      <h2 className="profile-name">
        {loading ? 'Loading...' : (user?.firstName ? `${user.firstName} ${user.lastName}` : 'User not found')}
      </h2>
      <p className="profile-email">{user?.email || ''}</p>

      <button className="logout-button" onClick={() => setShowLogoutModal(true)}>Logout</button>
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
  );
}

export default function ProfileSidebar({ user, loading }) {
  return (
    <div className="profile-sidebar">
      <div className="profile-avatar">
        <div className="avatar-placeholder"></div>
      </div>
      <h2 className="profile-name">
        {loading ? 'Loading...' : (user?.firstName ? `${user.firstName} ${user.lastName}` : 'User not found')}
      </h2>
      <p className="profile-email">{user?.email || ''}</p>
    </div>
  );
}

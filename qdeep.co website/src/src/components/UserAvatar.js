import React, { useState } from 'react';
import Avatar from 'react-avatar'; 
import './UserAvatar.css';

function UserAvatar({ onLoginClick, onRegisterClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="user-avatar-container">
      <div onClick={toggleMenu}>
        <Avatar name="User" size="40" round={true} />
      </div>
      {showMenu && (
        <div className="user-dropdown">
          <ul>
            <li onClick={onLoginClick}>Login</li>
            <li onClick={onRegisterClick}>Register</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import HomeOverlay from './components/HomeOverlay';
import TabManager from './components/TabManager';
import UserAvatar from './components/UserAvatar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // استيراد نافذة التسجيل
import QuantumMask from './components/QuantumMask';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // حالة التسجيل
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleMouseMove = (e) => {
    const windowHeight = window.innerHeight;
    if (e.clientY > windowHeight * 0.7) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  };

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
    setShowRegister(false);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <div className="background-container">
        {/* التبويبات */}
        <TabManager />

        {/* شريط الأيقونات */}
        <div className="top-icons-bar">
          <div className="left-icons">
            <UserAvatar 
              onLoginClick={() => setShowLogin(true)} 
              onRegisterClick={() => setShowRegister(true)} 
            />
          </div>
          <div className="right-icons">
            <QuantumMask />
          </div>
        </div>

        {/* خلفية الفيديو */}
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* المحتوى */}
        <div className="content">
          <SearchBar />
          <QuickLinks />
        </div>

        {/* Overlay */}
        <HomeOverlay show={showOverlay} onClose={() => setShowOverlay(false)} />

        {/* Login Modal */}
        {showLogin && (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onClose={() => setShowLogin(false)}
          />
        )}

        {/* Register Modal */}
        {showRegister && (
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onClose={() => setShowRegister(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;

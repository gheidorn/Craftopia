import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>Craftopia</h1>
        </Link>

        {isAuthenticated && (
          <nav className="header-nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/farming" className="nav-link">Farming</Link>
            <Link to="/crafting" className="nav-link">Crafting</Link>
            <Link to="/bank" className="nav-link">Bank</Link>
          </nav>
        )}

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="user-name">{user?.username}</span>
              <button onClick={handleLogout} className="button button-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button button-secondary">
                Login
              </Link>
              <Link to="/register" className="button button-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

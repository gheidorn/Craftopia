import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <h1 className="landing-title">Welcome to Craftopia</h1>
        <p className="landing-subtitle">
          A time-based crafting game where you farm materials, craft components, and create legendary items
        </p>
        <div className="landing-actions">
          <Link to="/register" className="button button-primary">
            Get Started
          </Link>
          <Link to="/login" className="button button-secondary">
            Login
          </Link>
        </div>
      </div>

      <div className="landing-features">
        <div className="card feature-card">
          <h3>Farm Materials</h3>
          <p>Gather wood, metal, fish, and herbs with varying rarities from Common to Legendary.</p>
        </div>
        <div className="card feature-card">
          <h3>Craft Components</h3>
          <p>Process your materials into useful components like planks, ingots, and extracts.</p>
        </div>
        <div className="card feature-card">
          <h3>Create Items</h3>
          <p>Combine components to craft powerful items and build your collection.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

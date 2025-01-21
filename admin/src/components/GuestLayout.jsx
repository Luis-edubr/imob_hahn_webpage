import React from 'react';
import Logo from '../assets/logo.png'; 

export default function GuestLayout({ children }) {
  return (
    <div className="container">
      <div>
        <a href="/dashboard">
          <img src={Logo} alt="Logo" className="logo" style={{ width: 220, }} />
        </a>
      </div>
      <div className="card">
        {children}
      </div>
    </div>
  );
}
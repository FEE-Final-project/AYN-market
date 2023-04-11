import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

import './pages.css';

export default function Profile() {

  const { user } = useAuthContext();

  return (
    <div className="container">
      <div className="profile-header">
        <h1>Profile</h1>
        
        <i class="ri-account-box-fill     "></i>
        
        <h2>{user.name}</h2>
      </div>

      <div className="profile-info">
        <div className="info-row">
          <label>Username:</label>
          <span>{user.username}</span>
        </div>
        <div className="info-row">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        
        
          
        
      </div>
    </div>
  );
}

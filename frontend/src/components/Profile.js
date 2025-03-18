
// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/users/profile');
        setUserData(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email
        });
        setError('');
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await api.put('/users/profile', formData);
      setUserData(res.data);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {updateSuccess && (
        <div className="success-message">Profile updated successfully!</div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  username: userData.username,
                  email: userData.email
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Username:</span>
              <span className="info-value">{userData.username}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account Created:</span>
              <span className="info-value">
                {new Date(userData.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
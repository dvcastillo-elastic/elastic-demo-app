// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <main className="container">
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? (
              <Login login={login} />
            ) : (
              <Navigate replace to="/dashboard" />
            )
          } />
          <Route path="/signup" element={
            !isAuthenticated ? (
              <Signup login={login} />
            ) : (
              <Navigate replace to="/dashboard" />
            )
          } />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate replace to="/login" />
            )
          } />
          <Route path="/profile" element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          } />
          <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
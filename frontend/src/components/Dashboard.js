// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard');
        setDashboardData(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [refreshCount]);
  
  const handleRefresh = () => {
    setLoading(true);
    setRefreshCount(prev => prev + 1);
  };
  
  const generateLoad = async () => {
    try {
      await api.get('/load?seconds=3');
      alert('CPU load generated successfully');
    } catch (err) {
      console.error(err);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={handleRefresh}>
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-actions">
          <button className="btn btn-secondary" onClick={handleRefresh}>
            Refresh Data
          </button>
          <button className="btn btn-warning" onClick={generateLoad}>
            Generate CPU Load
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>User Statistics</h3>
          <div className="stat-grid">
            <div className="stat-item">
              <span className="stat-value">{dashboardData.stats.activeUsers}</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{dashboardData.stats.newUsers}</span>
              <span className="stat-label">New Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{dashboardData.stats.totalTransactions}</span>
              <span className="stat-label">Total Transactions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{dashboardData.stats.errorRate}%</span>
              <span className="stat-label">Error Rate</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>System Health</h3>
          <div className="progress-container">
            <div className="progress-item">
              <div className="progress-label">
                <span>CPU</span>
                <span>{dashboardData.systemHealth.cpu}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${dashboardData.systemHealth.cpu}%` }}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span>Memory</span>
                <span>{dashboardData.systemHealth.memory}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${dashboardData.systemHealth.memory}%` }}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span>Disk</span>
                <span>{dashboardData.systemHealth.disk}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${dashboardData.systemHealth.disk}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            {dashboardData.recentActivities.map((activity, index) => (
              <li key={index} className="activity-item">
                <span className="activity-type">{activity.type}</span>
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

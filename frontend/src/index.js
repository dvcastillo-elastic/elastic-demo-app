// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Initialize Elastic RUM
import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: 'elastic-demo-frontend',
  serverUrl: process.env.REACT_APP_APM_SERVER_URL || 'http://localhost:8200',
  environment: process.env.NODE_ENV || 'development',
  distributedTracing: true,
  logLevel: 'debug'
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
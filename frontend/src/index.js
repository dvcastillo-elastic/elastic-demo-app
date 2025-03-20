import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Initialize Elastic RUM with the recommended configuration
import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: 'elastic-demo-frontend',
  serverUrl: 'https://9f8397aa3ba3413fa762c139bc10e886.apm.us-east4.gcp.elastic-cloud.com:443',
  serviceVersion: '1.0.0',
  environment: 'production'
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

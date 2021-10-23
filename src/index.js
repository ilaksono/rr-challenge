import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from 'context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sass/index.scss';
import 'sass/keyframes.scss';
import 'sass/custombs.scss';
import 'sass/layouts.scss'
import 'sass/icons.scss'
import 'sass/loading.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
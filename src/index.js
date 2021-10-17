import React from 'react';
import ReactDOM from 'react-dom';
import 'sass/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from 'context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sass/custombs.scss';
import 'sass/layouts.scss'
import 'sass/icons.scss'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

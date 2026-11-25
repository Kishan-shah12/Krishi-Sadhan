/**
 * ==============================================================================
 * Copyright (c) 2026 Kishan Sah. All Rights Reserved.
 *
 * PROPRIETARY & CONFIDENTIAL NOTICE:
 * This software, source code, and associated documentation are the proprietary
 * property of Kishan Sah. Unauthorized copying, distribution, modification,
 * reproduction, or reverse engineering of this project via any medium is
 * strictly prohibited without explicit prior written permission from Kishan Sah.
 *
 * Founder & Author: Kishan Sah
 * LinkedIn: https://www.linkedin.com/in/kishan-sah-b97a73315/
 * ==============================================================================
 */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import SupportAdmin from './components/ChatSupport/SupportAdmin/index';

// const path = window.location.pathname

// ReactDOM.render(
//   <React.StrictMode>
//     { path.indexOf('/support') === -1 ? <App /> : <SupportAdmin /> }
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

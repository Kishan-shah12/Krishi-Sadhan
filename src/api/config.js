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

import Cookies from "js-cookie";
import axios from "axios";
import { renewAccessToken } from "./authAPI";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://krishi-sadhan-app.herokuapp.com",
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // will loop if refreshToken returns 401
      const token = await renewAccessToken();
      Cookies.set("access-token", token.access);
      error.config.headers["Authorization"] = "Bearer " + token.access;
      error.config.baseURL = undefined;
      return axios.request(error.config);
    }
  }
);

export default instance;

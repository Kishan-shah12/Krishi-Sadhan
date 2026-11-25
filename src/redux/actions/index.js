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

export const getLoginAction = () => {
  return {
    type: "LOGIN",
  };
};

export const getLogoutAction = () => {
  return {
    type: "LOGOUT",
  };
};

export const getSaveTokenAction = (tokens) => {
  return {
    type: "SAVE_TOKEN",
    payload: tokens,
  };
};

export const getSaveProfileAction = (user) => {
  return {
    type: "SAVE_PROFILE",
    payload: user,
  };
};

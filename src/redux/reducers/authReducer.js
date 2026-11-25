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

const initialstate = {
  user: {
    data: {
      first_name: "",
    },
  },
  isLoggedIn: false,
};

const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "SAVE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;

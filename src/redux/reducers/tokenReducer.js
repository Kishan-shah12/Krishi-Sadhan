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

const initialState = {
  token: {
    accessToken: "",
    refreshToken: "",
  },
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      return {
        ...state,
        token: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    default:
      return state;
  }
};

export default tokenReducer;

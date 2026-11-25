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

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import { getEquipmentsReducer } from "./equipReducers";

const rootReducer = combineReducers({
  authReducer,
  tokenReducer,
  getEquipmentsReducer
});

export default rootReducer;

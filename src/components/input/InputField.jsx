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

import React from "react";

//CSS
import "./InputField.css";

const InputField = ({ placeholder, onChange, value, type, required }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className=" w-3/4 mx-auto rounded-lg  placeholder:text-gray-400 placeholder:text-lg h-10 input-style mb-5 px-6 py-4"
      type={type}
      required={required}
    />
  );
};

export default InputField;

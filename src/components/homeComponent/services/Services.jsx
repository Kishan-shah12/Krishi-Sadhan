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
import "./Services.css";
import services4 from "../../../img/services4.png";

const Services = () => {
  return (
    <div className="h-1/2 bg-evergreen bg-grey mt-3 p-9">
      <div className="flex justify-center flex-col p-9">
        <h1 className="text-4xl mt-2 font-bold m-auto">Our Services</h1>
        <p className="mt-3 text-lg font-semibold m-auto ">
          Following are the services that Krishi Sadhan market provides for
          Farmers:
        </p>
        <img src={services4} className="serviceImg" alt="" />
      </div>
    </div>
  );
};

export default Services;

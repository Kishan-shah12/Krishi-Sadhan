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

import React, { useState, useEffect } from "react";
import Equipments from "../components/homeComponent/equipments/Equipments";
import Banner from "../components/homeComponent/banner/Banner";
import Services from "../components/homeComponent/services/Services";
import Stats from "../components/homeComponent/stats/Stats";
import Workflow from "../components/homeComponent/workflow/Workflow";
import Support from "../components/homeComponent/support/Support";
// import Faqs from '../components/homeComponent/faqs/Faqs'
// import ContactUs from '../components/homeComponent/contactUs/ContactUs'

const Home = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  console.log(latitude, longitude);

  return (
    <div style={{ overflow: "hidden" }}>
      <Banner />
      <Support />
      <Workflow />
      <Services />
      <Stats />
      <Equipments />
      {/* <Faqs /> */}
      {/* <ContactUs /> */}
    </div>
  );
};

export default Home;

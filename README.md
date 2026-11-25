# Krishi Sadhan (कृषि साधन) 🚜🌾

> **Farmer's First Choice** — A Peer-to-Peer Agricultural Equipment Sharing & Rental Aggregation Platform.

[![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel%20Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=for-the-badge)](./LICENSE)
[![Founder: Kishan Sah](https://img.shields.io/badge/Founder-Kishan%20Sah-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kishan-sah-b97a73315/)

---

## 👨‍💼 Founder Profile

<div align="center">

### **Kishan Sah**
**Founder, System Architect & Lead Developer**

[![LinkedIn Connect](https://img.shields.io/badge/LinkedIn-Connect%20with%20Kishan%20Sah-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kishan-sah-b97a73315/)

**LinkedIn Profile**: [https://www.linkedin.com/in/kishan-sah-b97a73315/](https://www.linkedin.com/in/kishan-sah-b97a73315/)

</div>

### About the Founder
**Kishan Sah** conceptualized, engineered, and architected **Krishi Sadhan** as an innovative technological solution addressing critical mechanization barriers faced by Indian smallholder farmers. Driven by the mission to make modern farming machinery universally accessible, Kishan Sah designed the end-to-end user experience, interactive web interfaces, peer-to-peer equipment aggregation workflows, geospatial matching algorithms, and integrated customer support architecture.

> *"Empowering every farmer with high-tech agricultural machinery on-demand, transforming idle farm equipment into a continuous income-generating asset."* — **Kishan Sah**

---

## 🔒 Proprietary Notice & Copyright

> ### ⚠️ STRICT WARNING: ALL RIGHTS RESERVED - DO NOT COPY
> **Copyright (c) 2026 Kishan Sah. All Rights Reserved.**
> 
> This repository, source code, visual components, algorithms, and documentation are strictly proprietary to **Kishan Sah**.
> **Unauthorized copying, reproduction, redistribution, mirroring, commercial exploitation, or creation of derivative works from this repository, via any medium, is strictly prohibited without explicit, prior written permission from Kishan Sah.**
>
> Legal action will be pursued against any copyright infringement. For full terms, please refer to the [LICENSE](./LICENSE) file.

---

## 📖 About Krishi Sadhan

Across rural agriculture, heavy farm machinery (such as tractors, harvesters, rotavators, and seeders) remains idle for up to 9 months outside peak planting and harvesting seasons. At the same time, marginal farmers cannot afford capital investments of ₹8–12 Lakhs to purchase new equipment, leaving them dependent on manual labor or predatory local rental rates.

**Krishi Sadhan** (aligned with **Smart India Hackathon / Problem Statement DB887 - Ministry of Skill Development and Entrepreneurship**) bridges this gap by creating an Uber-like equipment aggregation and rental marketplace:
- **Equipment Owners** turn idle machines into recurring income.
- **Renting Farmers** book verified machines nearby at affordable hourly or daily rates.
- **Support & Mediation** via in-app live chat and dispute resolution ensures trust and reliability.

---

## 🌟 Key Features

- 🚜 **Equipment Catalog & Search**: Comprehensive equipment listings with specifications, pricing per hour/day, ratings, and instant booking.
- 📍 **Geolocation-Powered Proximity Search**: Identifies and sorts machinery nearest to the farmer's fields to minimize transit costs.
- 📅 **Dynamic Booking & Scheduling**: Reserve equipment for specific timeframes with real-time status tracking (Pending, Accepted, Completed, Rejected).
- 💬 **Live Chat & Help Desk**: Integrated Chat Engine support allowing direct messaging between farmers, equipment owners, and support administrators.
- 🗣️ **Multilingual & Voice Accessibility**: Integrated Google Language Translation and Speech-to-Text Voice recognition (`react-speech-recognition`) for ease of use across regional languages and varying literacy levels.
- 📱 **Progressive Web App (PWA)**: Offline fallback support via custom service worker (`serviceworker.js` and `offline.html`).
- 🛡️ **Partner Dispute & Equipment Reporting**: Dedicated channels for dispute submission, cancellation management, and condition reporting.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React.js (v17.0.2), Create React App |
| **Routing** | React Router DOM (v6.2.2) |
| **State Management** | Redux, React-Redux, Redux-Logger |
| **Styling & UI** | Tailwind CSS (v3), CSS Modules, Ant Design Icons, FontAwesome |
| **Cloud & Database** | Firebase Firestore (v9 compat) |
| **Networking & APIs** | Axios, RESTful APIs, JS-Cookie, React-Cookie |
| **Realtime Chat** | React Chat Engine |
| **Form & Notifications** | EmailJS Browser, Date-Fns, React Date Range |
| **Speech Recognition** | React Speech Recognition |
| **Deployment Platform** | Vercel (Configured with SPA routing & zero-config build) |

---

## 🚀 Vercel Deployment Guide

Krishi Sadhan is completely configured and optimized for zero-downtime deployment on **Vercel**.

### Prerequisites
- A [Vercel Account](https://vercel.com/signup)
- Git repository containing this code

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Repository**:
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** ➡️ **"Project"**.
   - Select your Krishi Sadhan repository and click **Import**.

2. **Project Settings**:
   - **Framework Preset**: Create React App (automatically detected).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: Automatically configured by `vercel.json` (`CI=false npm run build`).
   - **Output Directory**: `build` (automatically configured).

3. **Configure Environment Variables**:
   In the **Environment Variables** section, enter the values according to [`.env.example`](./.env.example):
   - `REACT_APP_API_BASE_URL` (e.g., `https://krishi-sadhan-app.herokuapp.com`)
   - `REACT_APP_CE_PROJECT_ID` (Your Chat Engine Project ID)
   - `REACT_APP_CE_PRIVATE_KEY` (Your Chat Engine Private Key)
   - `REACT_APP_SERVICE_ID` (EmailJS Service ID)
   - `REACT_APP_TEMPLATE_ID` (EmailJS Template ID)
   - `REACT_APP_USER_ID` (EmailJS User ID)

4. **Click Deploy**:
   - Vercel will install dependencies and build the static bundle.
   - Your application will be live at `https://<your-project-name>.vercel.app`.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally if not already installed
npm i -g vercel

# Log in to Vercel
vercel login

# Deploy preview build
vercel

# Deploy production build
vercel --prod
```

### Why `vercel.json` is Included
The project includes a pre-configured `vercel.json` file:
```json
{
  "version": 2,
  "buildCommand": "CI=false npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- **SPA Rewrites**: Ensures all client-side React routes (`/dashboard`, `/login`, `/product/:id`, `/verify-otp`, `/booking-history`, etc.) resolve seamlessly to `/index.html` without throwing 404 errors on browser refresh.
- **CI Handling**: Sets `CI=false` during production compilation to prevent React Scripts from aborting builds due to standard linting warnings.

---

## 💻 Local Development Setup

> Note: Follow standard development practices. Do not install conflicting dependencies.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Krishi Sadhan"
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Populate .env with your respective keys
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Intellectual Property & Copyright Notice

```
Copyright (c) 2026 Kishan Sah. All Rights Reserved.

This project, source code, architecture, and associated assets are the proprietary
intellectual property of Kishan Sah. Copying, distributing, cloning, or modifying
any portion of this codebase without prior written authorization is strictly prohibited.
```

For inquiries, permissions, or partnership discussions:
- **Founder**: Kishan Sah
- **LinkedIn**: [https://www.linkedin.com/in/kishan-sah-b97a73315/](https://www.linkedin.com/in/kishan-sah-b97a73315/)

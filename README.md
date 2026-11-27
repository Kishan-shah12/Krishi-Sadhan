# Krishi Sadhan (कृषि साधन) 🚜🌾

> **Farmer's First Choice** — A Peer-to-Peer Agricultural Equipment Sharing & Rental Aggregation Platform.

[![Watch Video Demo](https://img.shields.io/badge/YouTube-Watch%20Video%20Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/VO9LX2Ts0bk?si=K2o7Zo3_z16ssm4b)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=for-the-badge)](./LICENSE)
[![Founder: Kishan Sah](https://img.shields.io/badge/Founder-Kishan%20Sah-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kishan-sah-b97a73315/)
[![Tech Stack: React 17](https://img.shields.io/badge/Frontend-React%2017-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![State: Redux](https://img.shields.io/badge/State-Redux-764ABC?style=for-the-badge&logo=redux)](https://redux.js.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Database: Firebase](https://img.shields.io/badge/Database-Firebase%20Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

---

## 📺 Project Video Demonstration

<div align="center">

[![Watch Krishi Sadhan Project Demo](https://img.youtube.com/vi/VO9LX2Ts0bk/hqdefault.jpg)](https://youtu.be/VO9LX2Ts0bk?si=K2o7Zo3_z16ssm4b)

### 🎬 **[▶️ Click Here to Watch Full Demo Video on YouTube](https://youtu.be/VO9LX2Ts0bk?si=K2o7Zo3_z16ssm4b)**
**Direct Video Link:** [https://youtu.be/VO9LX2Ts0bk?si=K2o7Zo3_z16ssm4b](https://youtu.be/VO9LX2Ts0bk?si=K2o7Zo3_z16ssm4b)

</div>

---

## 👨‍💼 Founder Profile

<div align="center">

### **Kishan Sah**
**Founder, System Architect & Lead Developer**

[![LinkedIn Connect](https://img.shields.io/badge/LinkedIn-Connect%20with%20Kishan%20Sah-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kishan-sah-b97a73315/)

🌐 **LinkedIn**: [https://www.linkedin.com/in/kishan-sah-b97a73315/](https://www.linkedin.com/in/kishan-sah-b97a73315/)

</div>

### About the Founder & Vision
**Kishan Sah** conceived, architected, and engineered **Krishi Sadhan** from the ground up as a technological solution to address the persistent mechanization deficit in rural agriculture. Recognizing that over 86% of smallholder farmers cannot bear the heavy capital expenditures of tractors, harvesters, and specialized farm implements, Kishan designed an end-to-end aggregation platform modeled after the sharing economy. 

Under Kishan's technical leadership, the platform combines modern web engineering with rural-first accessibility:
- Architected the peer-to-peer equipment aggregation engine and booking state pipeline.
- Engineered proximity-based geolocation discovery to minimize farm machinery transit distance and transit fees.
- Integrated voice recognition and vernacular multilingual translation to bridge literacy and linguistic barriers.
- Implemented real-time customer support, live chat engines, and dispute arbitration channels to build institutional trust among rural communities.

> *"Our mission is to ensure no farm in India remains uncultivated due to a lack of machinery, and no farm machine sits idle losing money for its owner. Krishi Sadhan turns idle farm machinery into active wealth for rural entrepreneurs."* — **Kishan Sah**

---

## 🔒 Proprietary Notice & Copyright

> ### ⚠️ STRICT WARNING: ALL RIGHTS RESERVED — DO NOT COPY
> **Copyright (c) 2026 Kishan Sah. All Rights Reserved.**
> 
> This repository, source code, visual components, algorithms, designs, and documentation are strictly proprietary to **Kishan Sah**.
> **Unauthorized copying, reproduction, distribution, scraping, cloning, commercial exploitation, or creation of derivative works from this repository, via any medium, is strictly prohibited without explicit, prior written permission from Kishan Sah.**
>
> Legal action will be pursued against any copyright infringement. For complete licensing terms, see [LICENSE](./LICENSE).

---

## 🌾 Detailed Problem Statement

### Background: Government Challenge (Smart India Hackathon)
> **Problem Statement ID DB887** | *Ministry of Skill Development and Entrepreneurship*  
> *"At a given time farmer equipment are idle during non-seasons. A platform that allows farmers to rent farming equipment for less during the off-season. A simple aggregation platform with call center support can function as booking equipment's will help farmers make additional income."*

### The Core Dilemma in Indian Agriculture
India is an agrarian economy where over 60% of the population relies on agriculture. However, agricultural productivity is severely constrained by a dual structural challenge:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          THE DUAL CRISIS IN FARM MECHANIZATION                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  🚜 THE EQUIPMENT OWNER (e.g., Ramu)          🌾 THE SMALLHOLDER (e.g., Seeta)  │
│  ┌──────────────────────────────────────┐     ┌───────────────────────────────┐ │
│  │ • Owns ₹8–12 Lakh tractor/harvester  │     │ • Farms < 2 hectares of land  │ │
│  │ • Used only 2–3 months per year      │     │ • Cannot afford machinery capex│ │
│  │ • Sits idle 9 months during off-season│     │ • Relies on slow manual labor │ │
│  │ • Incurs loan EMI & maintenance costs│     │ • Pays 40% more for labor     │ │
│  │ • Earns ₹0 idle-season income        │     │ • Low yield due to late sowing │ │
│  └──────────────────────────────────────┘     └───────────────────────────────┘ │
│                     │                                         │                 │
│                     └───────────────────┬─────────────────────┘                 │
│                                         ▼                                       │
│                       THE SYSTEMIC INFORMATION & TRUST VOID                     │
│                       • No central platform to list or discover idle machines   │
│                       • Opaque, predatory pricing by informal middlemen         │
│                       • High transit costs without geolocation tracking         │
│                       • Zero guarantee of availability, trust, or payment       │
│                       • No recourse or dispute arbitration mechanism            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Key Quantitative Indicators
| Indicator | Real-World Statistic | Practical Consequence |
| :--- | :--- | :--- |
| **Small & Marginal Farmers** | **86%** of all agricultural holdings | Farmers cannot justify buying capital-intensive machinery. |
| **Idle Equipment Waste** | **₹25,000+ Crores** in idle asset value | Productive machines sit depreciating under sheds for 8-9 months. |
| **Manual Labor Inefficiency** | **40% higher cost**, 3x slower | Late sowing and delayed harvesting cause 15–25% crop yield loss. |
| **Informal Rental Market** | **>95%** fragmented and unorganized | Middlemen extract high margins; no price transparency or contracts. |
| **Income Boost Potential** | **+30% to +45%** net farm income | Mechanization saves critical labor days and increases crop turnover. |

---

## 💡 The Krishi Sadhan Solution

**Krishi Sadhan** transforms agriculture through a digital sharing-economy aggregation model — essentially an **"Uber for Farm Machinery"** customized for the nuances of rural India.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           KRISHI SADHAN ECOSYSTEM                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│         🚜 EQUIPMENT OWNERS                     🌾 RENTING FARMERS              │
│       (Monetize Idle Machinery)               (Affordable Mechanization)        │
│                    │                                      │                     │
│                    ▼                                      ▼                     │
│      ┌──────────────────────────────────────────────────────────┐               │
│      │               KRISHI SADHAN CORE PLATFORM                │               │
│      │  • Geolocation Discovery & Radius Search (Nearest First)  │               │
│      │  • Verified Equipment Listings with High-Res Photos      │               │
│      │  • Transparent Hourly & Daily Rental Rates               │               │
│      │  • Real-Time Booking Calendar with State Management      │               │
│      │  • Dual Access: Responsive Web App + Voice Navigation    │               │
│      │  • Multilingual Localization (English, Hindi, Regional)  │               │
│      │  • Real-Time Chat Engine & Admin Call Support Desk       │               │
│      │  • Partner Dispute Arbitration & Condition Reporting     │               │
│      └──────────────────────────────────────────────────────────┘               │
│                                     │                                           │
│                                     ▼                                           │
│                       BENEFITS & ECONOMIC IMPACT                                │
│       ✅ Equipment Owners: Earn ₹30,000–₹80,000 extra per off-season             │
│       ✅ Renting Farmers: Save 35–50% on labor costs and complete crops on time  │
│       ✅ Rural Economy: Maximize asset utilization across geographic clusters    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Core Solution Capabilities:
1. **P2P Marketplace & Catalog**: Owners list tractors, combine harvesters, rotavators, power tillers, and threshers with hourly/daily pricing, specifications, and availability windows.
2. **Proximity-Based Geo-Matching**: Using device geolocation, the platform computes aerial distances to display nearest available machines first, drastically reducing transit delays and diesel overhead.
3. **Voice & Vernacular Accessibility**: Integrates Google Language Translation and browser-native Speech Recognition so farmers of any literacy level can speak their requirements in their native language.
4. **End-to-End Booking Lifecycle**: Streamlined workflow handling: `Booking Request` ➡️ `Owner Approval` ➡️ `Job Execution` ➡️ `Verification & Completion` ➡️ `Mutual Rating`.
5. **Integrated Support & Mediation**: Combines an interactive in-app live chat engine with a dedicated dispute management system and equipment condition reporting module.

---

## 🛠️ Comprehensive Technology Stack & Architecture

Every technology in Krishi Sadhan was selected with intention to ensure extreme responsiveness, offline-readiness, and intuitive UX for rural users:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                ARCHITECTURE LAYERS                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  PRESENTATION   │  React 17  •  Tailwind CSS  •  FontAwesome  •  Ant Icons      │
├─────────────────┼───────────────────────────────────────────────────────────────┤
│  ACCESSIBILITY  │  Speech Recognition  •  Google Translate  •  PWA Offline      │
├─────────────────┼───────────────────────────────────────────────────────────────┤
│  STATE & ROUTE  │  Redux  •  React-Redux  •  Redux-Logger  •  React Router v6   │
├─────────────────┼───────────────────────────────────────────────────────────────┤
│  COMMUNICATION  │  React Chat Engine  •  EmailJS  •  Axios HTTP Interceptors     │
├─────────────────┼───────────────────────────────────────────────────────────────┤
│  PERSISTENCE    │  Firebase Firestore (NoSQL)  •  JS-Cookie  •  React-Cookie    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Detailed Tech Stack Breakdown

#### 1. Core Framework & Routing
- **React.js (`v17.0.2`)**:
  - *Why Selected*: Component-driven declarative UI architecture with Virtual DOM reconciliation, ensuring rapid re-renders even on low-end budget smartphones.
  - *Role in Project*: Powers the entire single-page application (SPA), managing modular UI components like equipment cards, calendar pickers, interactive forms, and navigation bars.
- **React Router DOM (`v6.2.2`)**:
  - *Why Selected*: Industry-standard declarative routing library optimized for SPAs.
  - *Role in Project*: Controls seamless client-side page transitions across 18+ routes (`/`, `/dashboard`, `/login`, `/register`, `/verify-otp`, `/product/:id`, `/bookingRequest/:id`, `/chat`, `/booking-history`, `/partner-dispute`, `/policy`, `/feedback`) without triggering full-page server reloads.

#### 2. Global State Management
- **Redux (`v4.1.2`) & React-Redux (`v7.2.6`)**:
  - *Why Selected*: Provides predictable, centralized state management across complex, decoupled application workflows.
  - *Role in Project*: Manages application-wide states including user authentication tokens, active farmer profiles, loaded equipment catalogs, filter criteria, and active booking queues.
- **Redux-Logger (`v3.0.6`)**:
  - *Why Selected*: Middleware that logs all dispatched actions alongside previous and next state snapshots.
  - *Role in Project*: Ensures transparent debugging, state traceability, and reliable development auditing.

#### 3. Styling & Responsive Design
- **Tailwind CSS (`v3.0.22`)**:
  - *Why Selected*: Utility-first CSS framework that compiles to minimal, purged CSS bundles, ensuring ultra-fast load times on 2G/3G cellular networks.
  - *Role in Project*: Provides clean, responsive design styling across mobile, tablet, and desktop viewports with a consistent green-and-earth agricultural palette.
- **PostCSS (`v8.4.6`) & Autoprefixer (`v10.4.2`)**:
  - *Why Selected*: CSS post-processing pipeline.
  - *Role in Project*: Automatically prefixes vendor CSS properties ensuring cross-browser compatibility across older Android webviews and modern browsers.
- **Ant Design Icons (`v4.7.0`) & FontAwesome 6**:
  - *Why Selected*: Lightweight vector iconography.
  - *Role in Project*: Supplies clear visual indicators (tractors, user avatars, status badges, stars) helping semi-literate users navigate intuitively.

#### 4. Real-Time Data & Cloud Backend
- **Firebase Firestore (`v9.6.8` Compat)**:
  - *Why Selected*: Highly scalable, real-time cloud NoSQL document database with offline caching capabilities.
  - *Role in Project*: Powers real-time document sync, booking request storage, feedback submissions, and dynamic equipment status updates.
- **Axios (`v0.26.0`)**:
  - *Why Selected*: Feature-rich Promise-based HTTP client.
  - *Role in Project*: Communicates with the REST backend, featuring automated request/response interceptors that silently renew expired JWT access tokens using refresh tokens.

#### 5. Real-Time Communication & Messaging
- **React Chat Engine (`v1.11.22`)**:
  - *Why Selected*: Full-featured WebSocket-driven chat infrastructure with low latency.
  - *Role in Project*: Powers direct peer-to-peer real-time messaging between renting farmers and equipment owners, as well as live customer support administration.
- **EmailJS Browser (`v3.4.0`)**:
  - *Why Selected*: Client-side transactional email delivery without requiring a dedicated SMTP server.
  - *Role in Project*: Dispatches instant notifications, dispute alerts, and customer contact inquiries directly to support staff.

#### 6. Rural Accessibility & Vernacular Support
- **React Speech Recognition (`v3.9.0`)**:
  - *Why Selected*: React wrapper around the HTML5 Web Speech Recognition API.
  - *Role in Project*: Enables farmers who struggle with typing to search for equipment, navigate sections, and provide input using voice commands.
- **Google Translate Element API**:
  - *Why Selected*: Comprehensive automated multilingual translation.
  - *Role in Project*: Enables instantaneous translation of the entire platform into regional Indian languages (Hindi, Marathi, Punjabi, Telugu, Tamil, Bengali, etc.).

#### 7. Scheduling & Utilities
- **React Date Range (`v1.4.0`) & Date-Fns (`v2.28.0`)**:
  - *Why Selected*: Modular, lightweight date manipulation and calendar range selection.
  - *Role in Project*: Allows farmers to select rental start and end dates with immediate calculation of total rental days and estimated costs.
- **JS-Cookie (`v3.0.1`) & React-Cookie (`v4.1.1`)**:
  - *Why Selected*: Secure client-side cookie management.
  - *Role in Project*: Persists user session tokens, JWTs, and unique user identifiers (UUIDs) across browser restarts.
- **React Responsive Carousel (`v3.2.22`)**:
  - *Why Selected*: Lightweight touch-swipeable image carousel.
  - *Role in Project*: Showcases equipment machinery photos from multiple angles on the homepage and equipment detail views.
- **Service Worker & PWA Offline Shell (`serviceworker.js`, `offline.html`)**:
  - *Why Selected*: Progressive Web App standard for offline resilience.
  - *Role in Project*: Intercepts fetch requests to serve cached assets, ensuring the app continues to display essential contact information even when mobile networks drop out.

---

## 📱 User Journeys & Platform Workflows

### 1. Equipment Owner Journey
1. **Sign Up & KYC**: Registers with mobile number, verifies OTP, and sets up a profile.
2. **List Machinery**: Uploads photos of the tractor/harvester, sets specifications, location, and hourly/daily rates.
3. **Receive Bookings**: Receives booking requests with renter profile and requested dates.
4. **Accept & Earn**: Accepts the request, coordinates delivery via built-in Chat, and receives payment upon job completion.

### 2. Renting Farmer Journey
1. **Search & Proximity Sort**: Opens app, allows location access (or speaks via voice search), and browses machines sorted by nearest proximity.
2. **Review Specifications**: Inspects machinery photos, horsepower, attached implements, and owner ratings.
3. **Select Rental Dates**: Chooses required date range via the interactive calendar and submits a booking request.
4. **Coordinate & Cultivate**: Chats directly with the owner to arrange pickup/delivery and rates the service after field work is completed.

### 3. Mediation & Dispute Resolution
- In the event of mechanical breakdown, weather delays, or cancellations, either party can submit a **Partner Dispute** or **Cancellation Request** through dedicated forms.
- Administrators review disputes through the **Support Admin** dashboard with access to booking history and chat transcripts.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (`v16` or `v18` recommended)
- npm or yarn

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kishan-shah12/Krishi-Sadhan.git
   cd Krishi-Sadhan
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your keys (Firebase, Chat Engine, EmailJS).

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Local Development Server**:
   ```bash
   npm start
   ```
   The application will be running at [http://localhost:3000](http://localhost:3000).

---

## ⚖️ Intellectual Property & Attribution

```
Copyright (c) 2026 Kishan Sah. All Rights Reserved.

This software, source code, UI/UX designs, and documentation are the exclusive
intellectual property of Kishan Sah. No unauthorized duplication, reproduction,
or distribution is permitted under any circumstances.
```

- **Architect & Founder**: **Kishan Sah**
- **LinkedIn**: [https://www.linkedin.com/in/kishan-sah-b97a73315/](https://www.linkedin.com/in/kishan-sah-b97a73315/)
- **License Details**: [LICENSE](./LICENSE)

- **Off Campus code**: 8CT2UR

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

import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const app = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "krishi-sadhan-cc7b9.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "krishi-sadhan-cc7b9",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "krishi-sadhan-cc7b9.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "700193489659",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:700193489659:web:bcced5546f94e201b5a65e"
};

const FirebaseApp = Firebase.initializeApp(app);
const db = FirebaseApp.firestore();

export default db;
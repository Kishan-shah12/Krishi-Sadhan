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

import React, { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from "firebase/compat/app";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleMessage = (e) => {
    e.preventDefault();
    // const x=Math.random()*100;
    db.collection('roomA')
      .add({
        user: "Avi",
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.log("error in firebase", err));
  };

  useEffect(() => {
    db.collection('roomB').orderBy('timestamp', 'asc').onSnapshot((snapshot) => 
        setMessages(
            snapshot.docs.map(message => ({
                id: message.id,
                message: message.data().message
            }))
        )
    )
  }, [])
  console.log(messages);
  

  return (
    <div>
      <div class="mb-3 pt-0">
        <input
          type="text"
          placeholder="Placeholder"
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" onClick={(e) => handleMessage(e)}>
        Send
      </button>


      {
          messages?.map(message => (
              <h1>{message.message}</h1>
          ))
      }
    </div>
  );
};

export default Chat;

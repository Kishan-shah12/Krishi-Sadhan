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

import React, { useState } from "react"

import { styles } from "../styles";

import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";

const SupportWindow = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0', display: props.visible ? 'block' :'none' }
            }}
        >
            <EmailForm 
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)} 
            />

            <ChatEngine 
                visible={user !== null && chat !== null}
                user={user} 
                chat={chat} 
            />
        </div>
    )
}

export default SupportWindow;
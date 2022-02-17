import React from 'react'

import { UtilStyle } from './Option'

export default function Notification({ mobileSearch }) {
    return (
        <UtilStyle className={mobileSearch? 'mobile-hidden' : ''}>
            <i className="fas fa-bell"></i>
        </UtilStyle>
    )
}

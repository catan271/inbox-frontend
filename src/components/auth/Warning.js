import React from 'react'

export default function Warning({ message }) {
    return (
        <div style={{color: 'red'}}>
            <i className="fas fa-exclamation-triangle"></i> {message}
        </div>
    )
}
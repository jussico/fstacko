import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Blog app, Mental Department of Computer Science, Jussi Asp 2020</em>
        </div>
    )
}

export default Footer
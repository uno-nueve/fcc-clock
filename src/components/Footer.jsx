import React from 'react';

const Footer = () => {

    const footerStyle = {
        position: 'absolute',
        bottom: '10px',
        fontSize: '.9rem',
        fontWeight: 700,
        color: '#4a4e69'
    }

    const linkStyle = {
        textDecoration: 'none',
        fontSize: '.9rem',
        fontWeight: 700,
        color: '#f8f9fa',
        backgroundColor: '#4a4e69',
        padding: '.15rem',
        borderRadius: '5px'
    }

    return (
        <footer className='signature' style={footerStyle}>
            Written by <a href='https://codesandbox.io/dashboard/drafts?workspace=d632f3f6-2470-41d5-9019-efe3651b6a9f' target='_blank' rel='noreferrer' style={linkStyle}>
            Luciano
            </a>
        </footer>
    );
}

export default Footer;

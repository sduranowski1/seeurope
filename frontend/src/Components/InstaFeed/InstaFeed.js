import React, { useEffect } from 'react';

export const InstaFeed = ({ url }) => {
    useEffect(() => {
        // Load the Instagram embed script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.instagram.com/embed.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="12"
            style={{
                background: '#FFF',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '600px',
                minWidth: '300px',
                padding: 0,
                width: '99.375%',
                height: 'undefined',
                maxHeight: '100%',
            }}
        ></blockquote>
    );
};
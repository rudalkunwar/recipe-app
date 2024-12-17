import React, { useEffect, useState } from 'react';

const MessengerChatBot = ({
    pageId,
    appId,
    language = 'en_US'
}) => {
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Validate input parameters
        if (!pageId || !appId) {
            setError('Page ID and App ID are required');
            return;
        }

        // Facebook SDK Loading Function
        const loadFacebookSDK = () => {
            // Check if SDK script already exists
            if (document.getElementById('facebook-jssdk')) {
                return;
            }

            // Create script element
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = `https://connect.facebook.net/${language}/sdk.js`;
            script.async = true;
            script.crossOrigin = 'anonymous';

            script.onload = () => {
                // Ensure FB object is available
                if (window.FB) {
                    try {
                        // Initialize Facebook SDK
                        window.FB.init({
                            appId: appId,
                            cookie: true,
                            xfbml: true,
                            version: 'v17.0'
                        });

                        // Wait a bit to ensure CustomerChat is available
                        setTimeout(() => {
                            if (window.FB.CustomerChat) {
                                window.FB.CustomerChat.load();
                                setSdkLoaded(true);
                            } else {
                                setError('CustomerChat plugin not available. Check your Facebook App configuration.');
                            }
                        }, 1000);
                    } catch (initError) {
                        setError(`SDK Initialization Error: ${initError.message}`);
                    }
                } else {
                    setError('Facebook SDK not loaded correctly');
                }
            };

            script.onerror = () => {
                setError('Failed to load Facebook SDK. Check your network connection.');
            };

            // Append script to document
            document.body.appendChild(script);
        };

        // Load the SDK
        loadFacebookSDK();

        // Cleanup function
        return () => {
            const sdkScript = document.getElementById('facebook-jssdk');
            if (sdkScript) {
                sdkScript.remove();
            }
        };
    }, [pageId, appId, language]);

    // Error handling render
    if (error) {
        return (
            <div
                style={{
                    color: 'red',
                    padding: '10px',
                    border: '1px solid red',
                    margin: '10px 0'
                }}
            >
                Messenger Chat Error: {error}
            </div>
        );
    }

    // Render Messenger Chat Plugin
    return (
        <>
            {sdkLoaded && (
                <div
                    className="fb-customerchat"
                    attribution="setup_tool"
                    page_id={pageId}
                    theme_color="#0084ff"
                    logged_in_greeting="Hi! How can we help you?"
                    logged_out_greeting="Hi! Please log in to chat with us."
                />
            )}
        </>
    );
};

export default MessengerChatBot;
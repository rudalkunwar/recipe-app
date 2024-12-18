import React, { useEffect, useState, useCallback } from 'react';

const ChatBot = ({
    appId,
    pageId,
    loggedInGreeting = 'Hi! How can we help you today?',
    loggedOutGreeting = 'Hi! Please log in to chat with us.',
    themeColor = '#0084ff',
    debug = true // Added debug mode
}) => {
    const [sdkStatus, setSdkStatus] = useState({
        loaded: false,
        error: null,
        scriptAdded: false
    });

    // Debug logging function
    const debugLog = useCallback((message, data) => {
        if (debug) {
            console.log(`[Facebook Messenger Chat Debug] ${message}`, data || '');
        }
    }, [debug]);

    useEffect(() => {
        debugLog('Component Mounted', { appId, pageId });

        // Validate required props
        if (!appId) {
            debugLog('ERROR: App ID is missing');
            return;
        }
        if (!pageId) {
            debugLog('ERROR: Page ID is missing');
            return;
        }

        // Check if SDK is already loaded
        if (window.FB) {
            debugLog('FB SDK already loaded');
            setSdkStatus(prev => ({ ...prev, loaded: true }));
            return;
        }

        // Load Facebook SDK
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            debugLog('SDK Script Loaded');
            try {
                window.FB.init({
                    appId: appId,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v18.0',
                });

                debugLog('FB SDK Initialized', window.FB);

                // Force render of customer chat plugin
                if (window.FB.XFBML) {
                    window.FB.XFBML.parse();
                    debugLog('XFBML Parsed');
                }

                setSdkStatus({
                    loaded: true,
                    error: null,
                    scriptAdded: true
                });
            } catch (error) {
                debugLog('Initialization Error', error);
                setSdkStatus({
                    loaded: false,
                    error: error.message,
                    scriptAdded: true
                });
            }
        };

        script.onerror = (error) => {
            debugLog('Script Loading Error', error);
            setSdkStatus({
                loaded: false,
                error: 'Failed to load SDK',
                scriptAdded: true
            });
        };

        // Append script
        document.body.appendChild(script);
        setSdkStatus(prev => ({ ...prev, scriptAdded: true }));
        debugLog('Script Added to Document');

        // Cleanup
        return () => {
            const existingScript = document.querySelector('script[src="https://connect.facebook.net/en_US/sdk.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [appId, pageId, debugLog]);

    // Render debug information
    if (debug) {
        return (
            <div>
                <div style={{
                    border: '1px solid red',
                    padding: '10px',
                    margin: '10px 0',
                    backgroundColor: 'lightyellow'
                }}>
                    <h3>Facebook Messenger Chat Debug Info</h3>
                    <p>App ID: {appId || 'NOT SET'}</p>
                    <p>Page ID: {pageId || 'NOT SET'}</p>
                    <p>SDK Loaded: {sdkStatus.loaded ? 'Yes' : 'No'}</p>
                    {sdkStatus.error && (
                        <p style={{ color: 'red' }}>Error: {sdkStatus.error}</p>
                    )}
                </div>

                {/* Render actual chat component */}
                {sdkStatus.loaded && (
                    <div>
                        <div id="fb-root"></div>
                        <div
                            className="fb-customerchat"
                            attribution="setup_tool"
                            page_id={pageId}
                            theme_color={themeColor}
                            logged_in_greeting={loggedInGreeting}
                            logged_out_greeting={loggedOutGreeting}
                            minimized="true"
                        ></div>
                    </div>
                )}
            </div>
        );
    }

    // Normal rendering
    return sdkStatus.loaded ? (
        <div>
            <div id="fb-root"></div>
            <div
                className="fb-customerchat"
                attribution="setup_tool"
                page_id={pageId}
                theme_color={themeColor}
                logged_in_greeting={loggedInGreeting}
                logged_out_greeting={loggedOutGreeting}
                minimized="true"
            ></div>
        </div>
    ) : null;
};

export default ChatBot;
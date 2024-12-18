import React, { useEffect, useState, useCallback } from 'react';

// Custom error types for more specific error handling
class FacebookSDKError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FacebookSDKError';
    }
}

const ChatBot = ({
    appId,
    pageId,
    loggedInGreeting = 'Hi! How can we help you today?',
    loggedOutGreeting = 'Hi! Please log in to chat with us.',
    themeColor = '#0084ff',
    onError // Optional error callback prop
}) => {
    const [sdkStatus, setSdkStatus] = useState({
        loaded: false,
        error: null,
        retryCount: 0
    });

    // Comprehensive error logging and handling function
    const handleError = useCallback((error, context) => {
        // Log to console
        console.error(`Facebook Messenger Chat Error (${context}):`, error);

        // Call external error handler if provided
        if (onError && typeof onError === 'function') {
            onError({
                error,
                context,
                appId,
                pageId
            });
        }
    }, [onError, appId, pageId]);

    // Validate required props
    useEffect(() => {
        if (!appId) {
            handleError(
                new FacebookSDKError('Facebook App ID is required'),
                'Prop Validation'
            );
        }
        if (!pageId) {
            handleError(
                new FacebookSDKError('Facebook Page ID is required'),
                'Prop Validation'
            );
        }
    }, [appId, pageId, handleError]);

    useEffect(() => {
        // Prevent multiple SDK loading attempts
        if (sdkStatus.loaded || sdkStatus.retryCount > 3) return;

        // Load Facebook SDK
        const loadFacebookSDK = () => {
            // Check if SDK is already present
            if (window.FB) {
                setSdkStatus(prev => ({ ...prev, loaded: true }));
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';

            script.onload = () => {
                try {
                    // Validate FB object exists
                    if (!window.FB) {
                        throw new FacebookSDKError('Facebook SDK loaded but FB object is undefined');
                    }

                    // Initialize SDK with comprehensive error handling
                    window.FB.init({
                        appId: appId,
                        autoLogAppEvents: true,
                        xfbml: true,
                        version: 'v18.0', // Latest version as of December 2024
                    });

                    // Validate initialization
                    if (!window.FB.getAuthResponse) {
                        throw new FacebookSDKError('Facebook SDK initialization failed');
                    }

                    setSdkStatus({
                        loaded: true,
                        error: null,
                        retryCount: 0
                    });
                } catch (error) {
                    handleError(error, 'SDK Initialization');
                    setSdkStatus(prev => ({
                        loaded: false,
                        error,
                        retryCount: prev.retryCount + 1
                    }));
                }
            };

            script.onerror = (error) => {
                handleError(
                    new FacebookSDKError('Failed to load Facebook SDK script'),
                    'Script Loading'
                );
                setSdkStatus(prev => ({
                    loaded: false,
                    error,
                    retryCount: prev.retryCount + 1
                }));
            };

            try {
                document.body.appendChild(script);
            } catch (appendError) {
                handleError(appendError, 'Script Appending');
            }
        };

        loadFacebookSDK();

        // Cleanup function to remove script if component unmounts
        return () => {
            const script = document.querySelector('script[src="https://connect.facebook.net/en_US/sdk.js"]');
            if (script) {
                script.remove();
            }
        };
    }, [appId, handleError, sdkStatus.loaded, sdkStatus.retryCount]);

    // Render error state or fallback UI
    if (sdkStatus.error) {
        return (
            <div
                className="facebook-messenger-error"
                style={{
                    color: 'red',
                    padding: '10px',
                    border: '1px solid red',
                    borderRadius: '5px'
                }}
            >
                Failed to load Facebook Messenger Chat.
                {sdkStatus.retryCount > 0 && ` (Retry attempt: ${sdkStatus.retryCount})`}
            </div>
        );
    }

    // Only render customer chat if SDK is fully loaded and all required props are present
    if (!sdkStatus.loaded || !appId || !pageId) {
        return null;
    }

    return (
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
    );
};

export default ChatBot;
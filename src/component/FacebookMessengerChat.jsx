import React, { useEffect } from 'react';

const FacebookMessengerChat = ({ appId, pageId, themeColor = '#0084ff',
}) => {
    useEffect(() => {
        const loadFacebookSDK = () => {
            console.log("🔧 [Facebook SDK] Initializing...");

            // Check if the SDK is already loaded
            if (document.getElementById('facebook-jssdk')) {
                console.warn("⚠️ [Facebook SDK] SDK is already loaded.");
                return;
            }

            // Create fb-root if it doesn't exist
            if (!document.getElementById('fb-root')) {
                const fbRoot = document.createElement('div');
                fbRoot.id = 'fb-root';
                document.body.appendChild(fbRoot);
                console.log("✅ [Facebook SDK] fb-root created.");
            }

            // Initialize Facebook SDK
            window.fbAsyncInit = function () {
                console.log("⚙️ [Facebook SDK] Initializing settings...");
                window.FB.init({
                    appId: appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v21.0',
                });
                console.log("✅ [Facebook SDK] Successfully initialized.");
                window.FB.XFBML.parse();
            };

            // Load the SDK script
            (function (d, s, id) {
                const fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                const js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                js.onload = () => console.log("✅ [Facebook SDK] Script loaded.");
                js.onerror = () => console.error("❌ [Facebook SDK] Error loading script.");
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        };

        loadFacebookSDK();

        return () => {
            console.log("🧹 [Facebook SDK] Cleaning up...");
            const script = document.getElementById('facebook-jssdk');
            if (script) {
                script.remove();
                console.log("✅ [Facebook SDK] Script removed.");
            }
            const fbRoot = document.getElementById('fb-root');
            if (fbRoot) {
                fbRoot.remove();
                console.log("✅ [Facebook SDK] fb-root removed.");
            }
            delete window.FB;
            delete window.fbAsyncInit;
        };
    }, [appId, pageId]);

    return (
        <div>
            <div
                className="fb-customerchat"
                attribution="setup_tool"
                page_id={pageId}
                theme_color={themeColor}
                logged_in_greeting="Hi! How can we help you?"
                logged_out_greeting="Please log in to chat with us."
            // minimized="true"
            ></div>
        </div>
    );
};

export default FacebookMessengerChat;

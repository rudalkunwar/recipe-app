import React, { useEffect, useState } from 'react';

const ChatBot = ({
  appId = '592047586550815',
  pageId = '542291682293940',
  loggedInGreeting = 'Hi! How can we help you today!',
  loggedOutGreeting = 'Hi! Please log in to chat with us.',
  themeColor = '#0084ff'
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.async = true;
      js.defer = true;

      js.onload = () => {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: 'v21.0'
        });

        // Force XFBML parsing
        window.FB.XFBML.parse();
        setSdkLoaded(true);
      };

      document.body.appendChild(js);
    };

    loadFacebookSDK();

    // Cleanup
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
    };
  }, [appId]);

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

      {/* Debugging Information */}
      {!sdkLoaded && (
        <div style={{
          border: '1px solid yellow',
          padding: '10px',
          backgroundColor: 'lightyellow'
        }}>
          Facebook SDK Loading...
        </div>
      )}
    </div>
  );
};

export default ChatBot;
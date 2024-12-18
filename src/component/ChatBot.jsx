import React, { useEffect, useState } from 'react';

const ChatBot = ({ 
  appId, 
  pageId, 
  loggedInGreeting = 'Hi! How can we help you today?', 
  loggedOutGreeting = 'Hi! Please log in to chat with us.', 
  themeColor = '#0084ff' 
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (!window.FB) {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          window.FB.init({
            appId: appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v18.0',
          });

          // Force parse XFBML multiple times
          setTimeout(() => {
            window.FB.XFBML.parse();
          }, 500);
          setTimeout(() => {
            window.FB.XFBML.parse();
          }, 1500);

          setSdkLoaded(true);
        };

        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
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
      
      {/* Debugging information */}
      {!sdkLoaded && (
        <div style={{ 
          border: '1px solid red', 
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
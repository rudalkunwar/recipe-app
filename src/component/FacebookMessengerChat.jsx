import React, { useEffect } from 'react';

const FacebookMessengerChat = ({ 
  appId = '592047586550815', 
  pageId = '542291682293940', 
  themeColor = '#0084ff' 
}) => {
  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      // Remove any existing Facebook SDK scripts
      const existingScripts = document.getElementsByTagName('script');
      for (let script of existingScripts) {
        if (script.src.includes('connect.facebook.net')) {
          script.remove();
        }
      }

      // Create fb-root if not exists
      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }

      // Facebook SDK Script
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: 'v21.0'
        });

        // Force parse XFBML
        window.FB.XFBML.parse();
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    // Load SDK
    loadFacebookSDK();

    // Cleanup function
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
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
        minimized="true"
      ></div>
    </div>
  );
};

export default FacebookMessengerChat;
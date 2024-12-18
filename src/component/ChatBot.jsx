import React, { useEffect, useState } from 'react';

const ChatBot = ({
  appId = '592047586550815',
  pageId = '542291682293940',
  loggedInGreeting = 'Hi! How can we help you today?',
  loggedOutGreeting = 'Hi! Please log in to chat with us.',
  themeColor = '#0084ff'
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Facebook SDK Loading
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v21.0'  // Updated to latest version
      });

      // Force XFBML parsing
      window.FB.XFBML.parse();
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    return () => {
      // Cleanup if needed
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
    };
  }, [appId, pageId]);

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
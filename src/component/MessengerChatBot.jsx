import React, { useEffect } from 'react';

const MessengerChatBot = ({ pageId, appId }) => {
  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : appId,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v17.0'
      });
    };

    // Load the SDK script
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Add Messenger chat plugin
    const script = document.createElement('script');
    script.innerHTML = `
      window.fbAsyncInit = function() {
        FB.CustomerChat.load();
      };
    `;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, [appId]);

  return (
    <div>
      {/* Messenger Chat Plugin */}
      <div 
        className="fb-customerchat"
        attribution="setup_tool"
        page_id={pageId}
      >
      </div>
    </div>
  );
};

export default MessengerChatBot;
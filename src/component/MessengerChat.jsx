import React, { useEffect } from 'react';

const MessengerChat = () => {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div>
      {/* Messenger Chat Plugin Code */}
      <div id="fb-root"></div>
      <div 
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id="517579444770810"
      ></div>
    </div>
  );
};

export default MessengerChat;
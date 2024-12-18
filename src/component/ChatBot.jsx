import React, { useEffect, useState } from 'react';

export const ChatBot = () => {
  const [fbLoaded, setFbLoaded] = useState(false); // Track SDK load status

  useEffect(() => {
    // Initialize the Messenger SDK once the component is mounted
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '968976658430478', // Your Facebook App ID
        xfbml: true,
        version: 'v12.0', // Test with a different SDK version
      });
      console.log('Facebook Messenger SDK initialized');
      setFbLoaded(true); // Mark the SDK as loaded

      // Ensure the XFBML is parsed after SDK initialization
      window.FB.XFBML.parse();

      // Check if FB.CustomerChat is available
      if (window.FB && window.FB.CustomerChat) {
        console.log('FB.CustomerChat initialized');
      } else {
        console.error('FB.CustomerChat is not available after SDK init');
      }
    };

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.onload = function () {
        console.log('Facebook SDK script loaded');
      };
      js.onerror = function () {
        console.error('Error loading the Facebook SDK script');
      };
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // Cleanup the Facebook SDK when the component unmounts
    return () => {
      const fbScript = document.getElementById('facebook-jssdk');
      if (fbScript) {
        fbScript.remove();
      }
    };
  }, []);

  const handleChatButtonClick = () => {
    if (fbLoaded && window.FB && window.FB.CustomerChat) {
      console.log('Opening Messenger Chat...');
      // Open the Messenger chat dialog
      window.FB.CustomerChat.showDialog();
    } else {
      console.error('Facebook Messenger SDK or CustomerChat not available.');
      // Debugging: Checking the current state of FB object
      console.log('FB object:', window.FB);
      console.log('FB.CustomerChat:', window.FB?.CustomerChat);
    }
  };

  return (
    <div>
      {/* Custom Chat Button */}
      <button 
        onClick={handleChatButtonClick} 
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg fixed bottom-6 right-6 z-50"
      >
        Chat with Us
      </button>

      {/* Facebook Messenger Customer Chat */}
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="517579444770810" // Replace with your Facebook Page ID
        theme_color="#0084ff"
        logged_in_greeting="Hi! How can we help you?"
        logged_out_greeting="Please log in to chat with us."
      ></div>
    </div>
  );
};

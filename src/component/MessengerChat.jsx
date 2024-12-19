import React, { useEffect } from 'react';

const MessengerChat = () => {
    useEffect(() => {
        // Load the Facebook SDK script dynamically when the component is mounted
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        script.async = true;
        script.onload = () => {
            window.FB.init({
                xfbml: true,
                version: 'v15.0',
            });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            {/* This div will hold the Facebook Messenger chat widget */}
            <div
                className="fb-customerchat"
                attribution="setup_tool"
                page_id="517579444770810"  // Replace with your actual Facebook page ID
                theme_color="#0084ff"  // Customize the theme color
                logged_in_greeting="Hi! How can we help you?"
                logged_out_greeting="Goodbye!">
            </div>
        </div>
    );
};

export default MessengerChat;

import React, { useEffect } from 'react';

const MessengerWidget = () => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '968976658430478',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v21.0'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    return (
        <div className="fb-customerchat"
            attribution="setup_tool"
            page_id="517579444770810"
            theme_color="#0084ff"
            logged_in_greeting="Hi! How can we help you?"
            logged_out_greeting="Goodbye!"></div>
    );
};

export default MessengerWidget;
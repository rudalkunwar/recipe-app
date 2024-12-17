import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChatBot = ({ pageId, appId }) => {
    return (
        <div className='fixed z-50 top-0 right-0'>
            <FacebookProvider appId={appId}>
                <CustomChat
                    pageId={pageId}
                    minimized="true"
                    themeColor="#0084ff"
                    loggedInGreeting="Hi! How can we help you today?"
                    loggedOutGreeting="Hi! Please log in to chat with us."
                />
            </FacebookProvider>
        </div>
    );
};

export default MessengerChatBot;
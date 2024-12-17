import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChatBot = ({ pageId, appId }) => {
    return (
        <FacebookProvider appId={appId}>
            <CustomChat
                pageId={pageId}
                minimized="true"
                themeColor="#0084ff"
                loggedInGreeting="Hi! How can we help you today?"
                loggedOutGreeting="Hi! Please log in to chat with us."
            />
        </FacebookProvider>
    );
};

export default MessengerChatBot;
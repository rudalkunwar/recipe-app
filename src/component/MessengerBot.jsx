import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

function MessengerBot() {
    return (
        <FacebookProvider appId="592047586550815" chatSupport>
            <CustomChat pageId="542291682293940" minimized={true} />
        </FacebookProvider>
    );
}

export default MessengerBot;

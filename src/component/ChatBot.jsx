import React, { useState, useEffect } from 'react';
import { MessageCircleCode, SendHorizontal, DollarSign } from 'lucide-react';
import axios from '../utils/axiosInstance2'; // Ensure axiosInstance2 is properly configured

function ChatBot() {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const [fbUserId, setFbUserId] = useState(null); // Store Facebook User ID

  // Dynamically load the Facebook SDK script
  const loadFacebookSDK = () => {
    if (window.FB) return; // If FB is already loaded, do nothing

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.onload = () => initializeFacebookSDK();
    document.body.appendChild(script);
  };

  // Initialize the Facebook SDK after it's loaded
  const initializeFacebookSDK = () => {
    window.FB.init({
      appId: '968976658430478', // Replace with your App ID
      cookie: true,
      xfbml: true,
      version: 'v21.0' // Use the latest version
    });
  };

  useEffect(() => {
    loadFacebookSDK();
  }, []);

  const toggleChatBot = () => {
    setIsChatBotVisible((prevState) => !prevState);
  };

  const resetFee = () => {
    setTotalFee(0);
  };

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api('/me', (userInfo) => {
            console.log(userInfo);
            setFbUserId(userInfo.id); // Set Facebook User ID
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    // Add user message to messages
    const newMessages = [...messages, { role: 'user', content: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      // Send user message to Facebook Messenger via the backend
      const recipientId = fbUserId || "DEFAULT_USER_ID"; // Use dynamic Facebook User ID
      await axios.post('/api/send-message', {
        text: currentMessage,
        recipientId: recipientId
      });

      // Simulate receiving a response (you would listen for a real response here)
      const fbResponse = "This is a response from Facebook Messenger (simulated)";

      // Add Facebook response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: fbResponse }
      ]);
    } catch (error) {
      console.error("Error sending message to Facebook:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "Sorry, there was an error processing your request." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <div
        className="fixed bottom-5 right-5 text-xl rounded-full z-50 bg-green-500 text-white p-3 shadow-lg cursor-pointer 
                   hover:bg-green-600 transition-all duration-300 ease-in-out"
        onClick={toggleChatBot}
      >
        <MessageCircleCode size={40} color="white" />
      </div>

      {/* ChatBot Component */}
      {isChatBotVisible && (
        <div
          className="fixed bottom-20 right-5 bg-white text-black p-4 rounded-lg shadow-xl border border-gray-300 z-50 
                     w-80 h-[60vh] flex flex-col justify-between"
        >
          {/* Chat Header with Fee Tracker */}
          <div className="border-b border-gray-200 pb-2 mb-2 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Messenger</p>
              <p className="text-sm text-gray-500">How can I assist you today?</p>
            </div>
            <div
              className="flex items-center bg-yellow-100 px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-200"
              onClick={resetFee}
            >
              <DollarSign size={16} className="mr-1" />
              <span className="text-sm font-medium">
                ${totalFee.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md max-w-[80%] 
                    ${msg.role === 'user'
                      ? 'bg-teal-100 text-gray-800 self-end ml-auto'
                      : 'bg-gray-100 text-gray-800 self-start mr-auto'}`}
                >
                  {msg.content}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">No messages yet. Start the conversation!</p>
            )}
            {isLoading && (
              <div className="p-2 bg-gray-100 text-gray-800 rounded-md self-start">
                Typing...
              </div>
            )}
            {/* Show Facebook Login Button if not logged in */}
            {!fbUserId && (
              <div className="flex justify-center">
                <button onClick={handleFacebookLogin} className="bg-blue-500 text-white p-2 rounded-md">
                  Login with Facebook
                </button>
              </div>
            )}
          </div>

          {/* Chat Input */}
          {fbUserId ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none 
                             focus:ring-2 focus:ring-teal-500 text-sm"
                  placeholder="Write a message..."
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-md transition-all 
                           duration-300 ease-in-out disabled:opacity-50"
                disabled={isLoading || !currentMessage.trim()}
              >
                <SendHorizontal size={20} />
              </button>
            </form>
          ) : (
            <p className="text-center text-sm text-gray-500 mt-2">Please log in to start messaging.</p>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBot;

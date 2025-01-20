'use client';
import { useState } from 'react';

const DialogflowChatbot = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if chatbot is open

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: userInput, bot: '' },
    ]);

    setLoading(true);

    try {
      const response = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      if (data.botResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: '', bot: data.botResponse },
        ]);
      }
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    } finally {
      setLoading(false);
    }

    setUserInput('');
  };

  return (
    <div>
      {/* Emoji Button for Chatbot */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-yellow-500 text-3xl p-3 rounded-full"
        >
          🤖
        </button>
      )}

      {/* Chatbot window */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 w-80 h-96">
          <div className="chatbox h-64 overflow-y-auto mb-4 border-b pb-2">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg.user && <div className="user-msg text-blue-500">{msg.user}</div>}
                {msg.bot && <div className="bot-msg text-green-500">{msg.bot}</div>}
              </div>
            ))}
          </div>
          <div className="input-container flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow p-2 border rounded"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogflowChatbot;

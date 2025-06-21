import React, { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  PaperClipIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'HR Manager at Google',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks for your interest in the Frontend Developer position...',
      timestamp: '2 min ago',
      unread: 3,
      online: true,
      messages: [
        { id: 1, sender: 'recruiter', text: 'Hi John! I saw your application for the Frontend Developer position at Google.', time: '10:30 AM', read: true },
        { id: 2, sender: 'user', text: 'Hello Sarah! Thank you for reaching out. I\'m very excited about this opportunity.', time: '10:35 AM', read: true },
        { id: 3, sender: 'recruiter', text: 'Great! I\'d like to schedule a brief call to discuss your experience. Are you available this week?', time: '10:40 AM', read: true },
        { id: 4, sender: 'user', text: 'Absolutely! I\'m available Tuesday-Thursday between 2-5 PM EST.', time: '10:45 AM', read: true },
        { id: 5, sender: 'recruiter', text: 'Perfect! Let\'s schedule for Wednesday at 3 PM. I\'ll send you a calendar invite shortly.', time: '2 min ago', read: false }
      ]
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Tech Lead at Microsoft',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Your technical assessment results look impressive!',
      timestamp: '1 hour ago',
      unread: 1,
      online: false,
      messages: [
        { id: 1, sender: 'recruiter', text: 'Hi! I\'ve reviewed your technical assessment for the Senior React Developer role.', time: '1 hour ago', read: false },
        { id: 2, sender: 'recruiter', text: 'Your technical assessment results look impressive!', time: '1 hour ago', read: false }
      ]
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'Recruiter at Apple',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'When would be a good time for the final interview?',
      timestamp: 'Yesterday',
      unread: 0,
      online: true,
      messages: [
        { id: 1, sender: 'recruiter', text: 'Congratulations on passing the technical rounds!', time: 'Yesterday 3:20 PM', read: true },
        { id: 2, sender: 'user', text: 'Thank you so much! I\'m really excited about the opportunity.', time: 'Yesterday 3:25 PM', read: true },
        { id: 3, sender: 'recruiter', text: 'When would be a good time for the final interview?', time: 'Yesterday 3:30 PM', read: true }
      ]
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Engineering Manager at Netflix',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'We\'d love to discuss the senior engineer position...',
      timestamp: '2 days ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'recruiter', text: 'We\'d love to discuss the senior engineer position with you.', time: '2 days ago', read: true }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-full bg-gray-50">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                    <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <div className="mt-2 flex justify-end">
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConv ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConv.avatar}
                      alt={selectedConv.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedConv.name}</h2>
                    <p className="text-sm text-gray-600">{selectedConv.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <VideoCameraIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.time}</span>
                      {message.sender === 'user' && (
                        <CheckIcon className="w-3 h-3 ml-2" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <PaperClipIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <FaceSmileIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h2>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

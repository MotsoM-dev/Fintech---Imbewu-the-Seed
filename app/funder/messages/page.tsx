// app/funder/messages/page.tsx
"use client";

import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  type: string;
  preview: string;
  time: string;
  unread: boolean;
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const messages: Message[] = [
    { id: "1", sender: "Ubuntu Capital", type: "Fund", preview: "We reviewed your funding request and require...", time: "2 hours ago", unread: true },
    { id: "2", sender: "Seed Fund", type: "Fund", preview: "Your application has been approved!", time: "1 day ago", unread: false },
    { id: "3", sender: "Future Finance", type: "Support", preview: "Thanks for your response. We'll get back to you...", time: "2 days ago", unread: false },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500">Communicate with businesses and partners</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Message List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Inbox</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 cursor-pointer transition ${
                    selectedMessage === message.id ? "bg-blue-50" : "hover:bg-gray-50"
                  } ${message.unread ? "border-l-4 border-blue-500" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{message.sender}</p>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{message.time}</span>
                  </div>
                  {message.unread && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">New</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="col-span-2 flex flex-col h-full">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">UC</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Ubuntu Capital</p>
                    <p className="text-xs text-gray-400">Fund</p>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">We reviewed your funding request and require additional documentation. Please upload your latest bank statements.</p>
                    <span className="text-xs text-gray-400 mt-1 block">2 hours ago</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 ml-auto max-w-[80%]">
                    <p className="text-sm text-gray-700">I'll upload them right away. Thank you for the update!</p>
                    <span className="text-xs text-gray-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <p>Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
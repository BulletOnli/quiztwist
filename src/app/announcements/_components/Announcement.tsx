"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3005"); // Replace with your server URL

const Announcement = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (message) => {
      console.log(message);
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message: string, index: number) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Announcement;

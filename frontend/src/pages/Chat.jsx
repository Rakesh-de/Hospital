import { useState } from "react";
import aiApi from "../services/aiApi";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await aiApi.post("/chat", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        { role: "user", text: message },
        { role: "ai", text: res.data.reply },
      ]);

      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Assistant</h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
        style={{ width: "80%", padding: "10px" }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
import React, { useState, useEffect } from "react";
import "../../Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("user");

  const role = localStorage.getItem("represent");

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (text.trim()) {
      setMessages([...messages, text]);

      await sendMessage();

      setText("");
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/chat`,
        {
          userId: userId,
          text: text,
          role: localStorage.getItem("represent"),
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/chat`
      );
      setMessages(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 100);

    if (role === "") {
      localStorage.setItem("represent", "user");
    }

    const handleEnter = (event) => {
      if (event.key === "Enter") {
        handleSendMessage(event);
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleEnter);
    };
  }, [text, messages]);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="chat-container">
          {!isChatOpen ? (
            <div className="chat-icon" onClick={() => setIsChatOpen(true)}>
              <FontAwesomeIcon
                icon={faCommentDots}
                style={{ color: "#00b57d" }}
                size="2xl"
              />
            </div>
          ) : (
            <div className="chat-box">
              <div className="chat-message-div-parent">
                <div className="chat-message-div">
                  <p style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                    Chat messages
                  </p>
                </div>
                <div
                  className="close-icon"
                  onClick={() => setIsChatOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </div>
              </div>

              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className="chat-message">
                    {message.role !== "user" ? (
                      <span>operator: </span>
                    ) : (
                      <span>user: </span>
                    )}
                    {message.text}{" "}
                  </div>
                ))}
              </div>
              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="chat-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                />
              </form>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Chat;

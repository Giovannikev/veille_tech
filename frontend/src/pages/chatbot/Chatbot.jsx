import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import botIcon from './image/bot-regular-24.png';
import './css/Chatbot.css';
import { VscRobot } from "react-icons/vsc";
function ChatBot() {
    const [chatInput, setChatInput] = useState("");
    const [chats, setChats] = useState([
        {
            message: "Bonjour👋 <br />Je suis GioK, un bot pour vous aider dans vos recherches ?",
            className: "incoming",
        },
    ]);

    const handleChat = () => {
        const userMessage = chatInput.trim();
        if (!userMessage) return;

        setChats((prevChats) => [
            ...prevChats,
            { message: userMessage, className: "outgoing" },
        ]);

        setChatInput("");

        setTimeout(() => {
            setChats((prevChats) => [
                ...prevChats,
                {
                    message: "Bienvenue sur notre site web. Ce plateforme a ete creer pour vous aider que vous soyez un debutant ou professional. Apres avoir acheve nos formation de haut niveaux, nous vous garantisons que votre profil sera booster et plus visile par les entreprise vis nos certification ! Sur ce bon courage dans votre parcours !",
                    className: "incoming",
                },
            ]);
        }, 600);
    };

    useEffect(() => {
        const chatbotToggler = document.querySelector(".chatbot-toggler");
        chatbotToggler.addEventListener("click", () => {
            document.body.classList.toggle("show-chatbot");
        });

        return () => {
            chatbotToggler.removeEventListener("click", () => {
                document.body.classList.toggle("show-chatbot");
            });
        };
    }, []);

    return (
        <>
            <button className="chatbot-toggler">
                <Link to='/chatbot'>
                    <VscRobot size={26} />
                </Link>
            </button>

            <div className="chatbot">
                <div className="header-chat">
                    <h3>Chatbot</h3>
                </div>

                <ul className="chatbox">
                    {chats.map((chat, index) => (
                        <li key={index} className={`chat ${chat.className}`}>
                            {chat.className === "incoming" && (
                                <span className="material-symbols-outlined">
                                    <VscRobot size={26} />
                                </span>
                            )}
                            <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
                        </li>
                    ))}
                </ul>

                <div className="chat-input">
                    <textarea
                        id="chat-textarea"
                        placeholder="Enter a message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        required
                    ></textarea>
                    <button
                        id="send-btn"
                        className="send-btn"
                        style={{ display: chatInput.trim() !== "" ? "block" : "none" }}
                        onClick={handleChat}
                    >
                        <img alt="Send" src="./image/send-regular-24.png" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatBot;

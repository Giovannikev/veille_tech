import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/ChatBotPage.css';

const ChatBotPage = () => {
    const [messages, setMessages] = useState([
        {
            content: 'Bonjour ! Je suis Ikaly-bot, votre assistant culinaire IA. Comment puis-je vous aider à trouver le restaurant parfait aujourd\'hui ?',
            isUser: false,
        },
    ]);
    const [userInput, setUserInput] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const botResponses = [
        "Je recherche les meilleurs restaurants correspondants à votre demande...",
        "Voici ce que j'ai trouvé pour vous...",
        "Laissez-moi chercher parmi nos recommandations...",
        "Je vais trouver les options les plus adaptées pour vous...",
        "D'accord, laissez-moi trouver les informations nécessaires...",
    ];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/restaurant/list/api/')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the restaurant data!', error);
            });
    }, []);

    const promptCards = [
        'Trouve moi le meilleur restaurant italien avec terrasse',
        'Où est-ce qu\'il y a le meilleur sushi du quartier',
        'Brunch familial dimanche',
    ];

    const addMessage = (content, isUser = false) => {
        setMessages((prevMessages) => [...prevMessages, { content, isUser }]);
    };

    const addRestaurantCard = (restaurant) => {
        addMessage(
            <div className="chat-restaurant-card">
                <Link to={`/restaurant/detail/${restaurant.id}`} ><img src={restaurant.main_image} alt={restaurant.name} className="chat-restaurant-image" />
                    <div className="chat-restaurant-info">
                        <h3>{restaurant.name}</h3>
                        <p>Cuisine : {restaurant.speciality}</p>
                        <p>Note : {restaurant.rating}/5</p>
                        <p>Adresse : {restaurant.address}</p>
                    </div>
                </Link>
            </div>
        );
    };

    const botReply = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();
        const filteredRestaurants = restaurants.filter(restaurant => {
            return lowerCaseMessage.split(' ').some(word =>
                restaurant.description.toLowerCase().includes(word) ||
                restaurant.speciality.toLowerCase().includes(word)
            );
        }).slice(0, 5);;


        if (filteredRestaurants.length > 0) {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse);
            filteredRestaurants.forEach(restaurant => addRestaurantCard(restaurant));
        } else {
            addMessage("Je n'ai pas trouvé de restaurants spécifiques pour cette requête. Pourriez-vous me donner plus de détails sur le type de cuisine que vous recherchez ?");
        }
    };

    const handleSend = () => {
        if (userInput.trim()) {
            addMessage(userInput, true);
            botReply(userInput);
            setUserInput('');
        }
    };

    return (
        <div className="chatpage-container">
            <div className="chat-header">
                <h1 className='banner__title'>Ikaly-bot</h1>
                <p>Votre assistant culinaire IA</p>
            </div>

            <div className="prompt-grid">
                {promptCards.map((prompt, index) => (
                    <div key={index} className="prompt-card" onClick={() => { setUserInput(prompt); handleSend(); }}>
                        {prompt}
                    </div>
                ))}
            </div>

            <div className="chat-window">
                <div className="chat-messages" id="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                            <div className="message-content">{message.content}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Décrivez le restaurant que vous recherchez..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
                    />
                    <button id="chat-send-button" onClick={handleSend}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBotPage;

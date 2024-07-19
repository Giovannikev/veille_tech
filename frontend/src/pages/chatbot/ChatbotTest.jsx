// Dans votre composant React où vous avez le chatbot

import React, { useState } from 'react';
import axios from 'axios';

const ChatbotComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSendPrompt = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/chatbot/', { prompt });
            console.log(response.data.response);
            setResponse(response.data.response);
            setError('');
        } catch (error) {
            setError('Error fetching response from chatbot');
            setResponse('');
        }
    };

    return (

        <div className='chat-container'>
            <div className='reservation-form-group'>
                <h2>Chatbot</h2>
                <input type="text" value={prompt} onChange={handlePromptChange} />
                <button onClick={handleSendPrompt} className="sm-button button-bg">Send</button>
                {response && <p>{response}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default ChatbotComponent;

import React, { useState, useRef, useEffect } from "react";
import './Messages.css'; 
import sendIcon from '../../assets/sent.jpg';
import axios from "axios"; 
function Messages() {
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [therapists, setTherapists] = useState([]); 
    const chatEndRef = useRef(null); 

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const response = await axios.get('http://localhost:8810/echomind/api/therapist/getallnames/'); 
                setTherapists(response.data);
                console.log("Therapists fetched:", response.data); 
            } catch (error) {
                console.error('Error fetching therapists:', error);
            }
        };

        fetchTherapists();
    }, []);

    const handleTherapistClick = (therapist) => {
        setSelectedTherapist(therapist);
        setMessages([{ from: 'therapist', text: 'Welcome! How can we assist you today?' }]);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, { from: 'patient', text: inputMessage }]);
            setInputMessage('');
        }
    };

    const handleEndChat = () => {
        setShowFeedbackPopup(true);
    };

    const filteredTherapists = therapists.filter(therapist => 
        therapist && therapist.name && therapist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="messages-container">
            <div className="therapist-list">
                <h2 className="therapist-header">Select a Therapist</h2>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Therapist"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredTherapists.map(therapist => (
                    <div 
                        key={therapist.id} 
                        className="therapist" 
                        onClick={() => handleTherapistClick(therapist)}
                    >
                        {therapist.name}
                    </div>
                ))}
            </div>

            <div className={`chat-area ${selectedTherapist ? 'visible' : 'hidden'}`}>
                {!selectedTherapist && (
                    <div className="welcome-message">
                        Welcome to your therapy session. Please select a therapist.
                    </div>
                )}
                {selectedTherapist && (
                    <>
                        <div className="chat-header">
                            <h2>{selectedTherapist.name}</h2>
                            <button onClick={handleEndChat}>End Chat</button>
                        </div>
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.from}`}>
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="message-input-container">
                            <input 
                                type="text" 
                                className="message-input" 
                                placeholder="Type your message..." 
                                value={inputMessage} 
                                onChange={(e) => setInputMessage(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button className="send-button" onClick={handleSendMessage}>
                                <img src={sendIcon} alt="Send" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {showFeedbackPopup && (
                <div className="feedback-popup">
                    <h2>Feedback</h2>
                    <textarea 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)} 
                        placeholder="Your feedback here..."
                    />
                    <button>Submit</button>
                    <button onClick={() => setShowFeedbackPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Messages;

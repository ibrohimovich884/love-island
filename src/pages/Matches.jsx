import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './Matches.css';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await api.get('/users/matches');
                setMatches(res.data);
            } catch (err) {
                console.error("Matchlarni yuklashda xato");
            }
        };
        fetchMatches();
    }, []);

    return (
        <div className="matches-container">
            <div className="matches-header">
                <button onClick={() => navigate(-1)} className="back-btn"><ArrowLeft /></button>
                <h2>Juftliklar ❤️</h2>
            </div>

            <div className="matches-grid">
                {matches.length === 0 ? (
                    <div className="no-matches">
                        <Heart size={50} color="#ff4d6d" />
                        <p>Hozircha hech kim bilan bog'lanmadingiz.</p>
                    </div>
                ) : (
                    matches.map(match => (
                        <div key={match.user_id} className="match-card" onClick={() => navigate(`/chat/${match.user_id}`)}>
                            <div className="match-avatar-box">
                                <img src={match.avatar_url || '/avatar.png'} alt={match.username} />
                                <div className="online-badge"></div>
                            </div>
                            <h3>{match.username}</h3>
                            <button className="chat-start-btn">
                                <MessageCircle size={18} /> Chat
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Matches;
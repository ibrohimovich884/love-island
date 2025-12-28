import { Search, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-content-wrapper">
            {/* Asosiy Banner Card */}
            <div className="partner-card">
                <div className="partner-info">
                    <div className="heart-circle">
                        <Heart fill="#fff" color="#fff" size={32} />
                    </div>
                    <h4>Juftingiz bilan bog'laning</h4>
                    <p>O'yinlarni birgalikda o'ynash uchun juftingizni qidiring</p>
                </div>
                <button 
                    className="search-partner-btn" 
                    onClick={() => navigate('/search')}
                >
                    <Search size={20} /> Qidirishni boshlash
                </button>
            </div>

            <div className="section-title">
                <h4>Mashhur o'yinlar</h4>
            </div>

            {/* O'yinlar ro'yxati */}
            <div className="games-grid">
                <div className="game-item">
                    <div className="game-icon quiz">❓</div>
                    <span>Quiz Game</span>
                </div>
                <div className="game-item">
                    <div className="game-icon match">🧩</div>
                    <span>Match Cards</span>
                </div>
                <div className="game-item">
                    <div className="game-icon truth">💬</div>
                    <span>Truth or Dare</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
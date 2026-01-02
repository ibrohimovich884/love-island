
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Hash } from 'lucide-react';
import './Games.css';

const Games = () => {
    const navigate = useNavigate();

    const gamesList = [
        {
            id: 'checkers',
            name: 'Shashka',
            icon: <Target size={40} />,
            color: '#ff4d6d',
            // DEPLOY qilingan manzilingizni shu yerga yozing
            path: 'https://checkers-one-two.vercel.app', 
            active: true
        },
         {
            id: 'chess',
            name: 'Shaxmat',
            icon: <Trophy size={40} />,
            color: '#7209b7',
            path: '#',
            active: false // Hali tayyor emas
        },
        {
            id: 'tictactoe',
            name: 'X-O Oʻyini',
            icon: <Hash size={40} />,
            color: '#4361ee',
            path: '#',
            active: false // Hali tayyor emas
        }
        // ... boshqa o'yinlar
    ];

    const handlePlay = (game) => {
        if (!game.active) {
            alert("Tez kunda: Bu o'yin hali ishlab chiqilmoqda! 🚀");
            return;
        }

        // 1. LocalStorage'dan tokenni qidiramiz
        const token = localStorage.getItem('token'); 

        if (!token) {
            // Agar foydalanuvchi login qilmagan bo'lsa
            alert("O'yinni boshlash uchun iltimos tizimga kiring!");
            navigate('/login');
            return;
        }

        // 2. Tokenni URL parametr sifatida qo'shib, o'yinga yuboramiz
        // "auth_token" kalit so'zi bilan yuboramiz
        window.location.href = `${game.path}?auth_token=${token}`;
    };

    return (
        <div className="games-container">
            {/* ... JSX qismi o'zgarmaydi ... */}
            <div className="games-grid">
                {gamesList.map((game) => (
                    <div 
                        key={game.id} 
                        className={`game-card ${!game.active ? 'locked' : ''}`}
                        onClick={() => handlePlay(game)}
                        style={{ '--game-color': game.color }}
                    >
                        <div className="game-icon-wrapper">{game.icon}</div>
                        <h3>{game.name}</h3>
                        {!game.active && <span className="status-badge">Soon</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Games;
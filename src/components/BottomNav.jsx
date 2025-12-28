import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Gamepad2, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Faqat home, games va profile sahifalarida ko'rinsin
    const showNav = ['/home', '/games', '/profile'].includes(location.pathname);
    if (!showNav) return null;

    return (
        <nav className="bottom-nav">
            <div className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`} 
                 onClick={() => navigate('/home')}>
                <Heart size={24} />
                <span>Asosiy</span>
            </div>
            <div className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`} 
                 onClick={() => navigate('/games')}>
                <Gamepad2 size={24} />
                <span>O'yinlar</span>
            </div>
            <div className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} 
                 onClick={() => navigate('/profile')}>
                <User size={24} />
                <span>Profil</span>
            </div>
        </nav>
    );
};

export default BottomNav;
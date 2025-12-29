import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Gamepad2, User, MessageCircle } from 'lucide-react'; // MessageCircle qo'shildi
import './BottomNav.css';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Endi /matches sahifasida ham BottomNav ko'rinadi
    const showNav = ['/home', '/games', '/matches', '/profile'].includes(location.pathname);
    
    if (!showNav) return null;

    return (
        <nav className="bottom-nav">
            {/* Asosiy (Discovery) */}
            <div className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`} 
                 onClick={() => navigate('/home')}>
                <Heart size={24} />
                <span>Asosiy</span>
            </div>

            {/* O'yinlar */}
            <div className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`} 
                 onClick={() => navigate('/games')}>
                <Gamepad2 size={24} />
                <span>O'yinlar</span>
            </div>

            {/* MATCHES (Juftliklar) - YANGI QO'SHILDI */}
            <div className={`nav-item ${location.pathname === '/matches' ? 'active' : ''}`} 
                 onClick={() => navigate('/matches')}>
                <MessageCircle size={24} />
                <span>Juftliklar</span>
            </div>

            {/* Profil */}
            <div className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} 
                 onClick={() => navigate('/profile')}>
                <User size={24} />
                <span>Profil</span>
            </div>
        </nav>
    );
};

export default BottomNav;
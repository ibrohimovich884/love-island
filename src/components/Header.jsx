import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Bell } from 'lucide-react';
import './Header.css';

const Header = () => {
    const { user } = useContext(AuthContext);
    if (!user) return null;

    return (
        <header className="main-header">
            <div className="user-section">
                <img src="/avatar.png"alt="avatar" className="header-avatar" />
                <div className="user-text">
                    <span className="welcome">Salom,</span>
                    <h3 className="username">{user.username} ✨</h3>
                </div>
            </div>
            <button className="notif-btn">
                <Bell size={22} />
                <span className="dot"></span>
            </button>
        </header>
    );
};

export default Header;
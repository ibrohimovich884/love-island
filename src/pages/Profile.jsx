import { useContext, useState} from 'react';
import { AuthContext } from '../store/AuthContext';
import { LogOut, User, Settings, Shield, Bell, Heart } from 'lucide-react';
import './Profile.css';
import EditProfile from '../components/EditProfile';
const Profile = () => {
    const { user, setUser, logout } = useContext(AuthContext); 
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <EditProfile user={user} setUser={setUser} onClose={() => setIsEditing(false)} />;
    }

    return (
        <div className="profile-container">
            {/* Profil Tepasi */}
            <div className="profile-header-card">
                <div className="avatar-wrapper">
                    <img src={user?.avatar_url || '/avatar.png'} alt="avatar" />
                    <div className="edit-badge"><Settings size={14} /></div>
                </div>
                <h2>{user?.username}</h2>
                <p>{user?.email}</p>
            </div>

            {/* Statistika (Vaqtincha) */}
            <div className="profile-stats">
                <div className="stat-item">
                    <span>O'yinlar</span>
                    <strong>12</strong>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span>Juftlik</span>
                    <strong>Bog'lanmagan</strong>
                </div>
            </div>

            {/* Menyu Bo'limlari */}
            <div className="profile-menu">
                <div className="menu-item"  onClick={() => setIsEditing(true)}>
                    <div className="menu-icon"><User size={20} color="#4dabf7" /></div>
                    <span>Ma'lumotlarni tahrirlash</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><Bell size={20} color="#ff922b" /></div>
                    <span>Bildirishnomalar</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><Shield size={20} color="#51cf66" /></div>
                    <span>Xavfsizlik</span>
                </div>

                <div className="menu-divider"></div>

                <div className="menu-item logout" onClick={logout}>
                    <div className="menu-icon"><LogOut size={20} color="#ff4d6d" /></div>
                    <span>Tizimdan chiqish</span>
                </div>
            </div>

            <div className="app-version">Version 1.0.2</div>
        </div>
    );
};

export default Profile;
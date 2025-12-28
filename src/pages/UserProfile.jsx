import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Grid, Tv, UserSquare2 } from 'lucide-react';
import api from '../services/api';
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams(); // URL dan user ID sini olamiz
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/profile/${id}`); // Backenddan userni olish
                setUser(res.data);
            } catch (err) {
                console.error("Userni yuklashda xato:", err);
            }
        };
        fetchUser();
    }, [id]);

    if (!user) return <div className="loader">Yuklanmoqda...</div>;

    return (
        <div className="full-profile-page">
            {/* Header: Orqaga qaytish va User nomi */}
            <div className="profile-top-nav">
                <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                <h3 className="nav-username">{user.username}</h3>
                <MoreHorizontal />
            </div>

            <div className="profile-content">
                {/* Asosiy ma'lumotlar qismi */}
                <div className="profile-header-main">
                    <div className="profile-avatar-container">
                        <img src={user.avatar_url || '/avatar.png'} alt="avatar" className="main-avatar" />
                    </div>
                    
                    <div className="profile-stats">
                        <div className="stat-box"><strong>--</strong><span>followers</span></div>
                        <div className="stat-box"><strong>--</strong><span>following</span></div>
                    </div>
                </div>

                {/* Bio qismi */}
                <div className="profile-bio-section">
                    <h4 className="bio-name">{user.username}</h4>
                    <p className="bio-text">{user.bio || "Love Island foydalanuvchisi"}</p>
                </div>

                {/* Action tugmalari */}
                <div className="profile-actions">
                    <button className="btn-follow">Following</button>
                    <button className="btn-message" onClick={() => navigate(`/chat/${user.id}`)}>
                        Message
                    </button>
                </div>

                {/* Tablar (Instagram uslubida) */}
                <div className="profile-tabs">
                    <div className="tab active"><Grid size={20} /></div>
                    <div className="tab"><Tv size={20} /></div>
                    <div className="tab"><UserSquare2 size={20} /></div>
                </div>

                {/* Bo'sh holat */}
                <div className="no-posts">
                    <div className="no-posts-icon">📸</div>
                    <h2>No Posts Yet</h2>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
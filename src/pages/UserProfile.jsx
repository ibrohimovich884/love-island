import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Grid, Tv, UserSquare2 } from 'lucide-react';
import api from '../services/api';
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    // 1. MANA SHU O'ZGARUVCHINI QO'SHISH KERAK EDI:
    const [isRequested, setIsRequested] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/profile/${id}`);
                setUser(res.data);
            } catch (err) {
                console.error("Userni yuklashda xato:", err);
            }
        };
        fetchUser();
    }, [id]);

    // 2. FOLLOW (MATCH) FUNKSIYASI
    const handleFollow = async () => {
        try {
            await api.post('/users/request', { friendId: user.id });
            setIsRequested(true); // So'rov yuborilgach, holatni o'zgartiramiz
            alert(`Siz ${user.username} bilan juftlik so'rovini yubordingiz! ❤️`);
        } catch (err) {
            alert(err.response?.data?.error || "Xatolik yuz berdi");
        }
    };

    if (!user) return <div className="loader">Yuklanmoqda...</div>;

    return (
        <div className="full-profile-page">
            <div className="profile-top-nav">
                <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                <h3 className="nav-username">{user.username}</h3>
                <MoreHorizontal />
            </div>

            <div className="profile-content">
                <div className="profile-header-main">
                    <div className="profile-avatar-container">
                        <img src={user.avatar_url || '/avatar.png'} alt="avatar" className="main-avatar" />
                    </div>
                    
                    <div className="profile-stats">
                        <div className="stat-box"><strong>--</strong><span>followers</span></div>
                        <div className="stat-box"><strong>--</strong><span>following</span></div>
                    </div>
                </div>

                <div className="profile-bio-section">
                    <h4 className="bio-name">{user.username}</h4>
                    <p className="bio-text">{user.bio || "Love Island foydalanuvchisi"}</p>
                </div>

                <div className="profile-actions">
                    {/* 3. TUGMA MANTIG'INI YANGILADIK */}
                    <button 
                        className={isRequested ? "btn-requested" : "btn-follow"} 
                        onClick={handleFollow}
                        disabled={isRequested}
                    >
                        {isRequested ? "Requested 💌" : "Love ❤️"}
                    </button>

                    <button className="btn-message" onClick={() => navigate(`/chat/${user.id}`)}>
                        Message
                    </button>
                </div>

                <div className="profile-tabs">
                    <div className="tab active"><Grid size={20} /></div>
                    <div className="tab"><Tv size={20} /></div>
                    <div className="tab"><UserSquare2 size={20} /></div>
                </div>

                <div className="no-posts">
                    <div className="no-posts-icon">📸</div>
                    <h2>No Posts Yet</h2>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
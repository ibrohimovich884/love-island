import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Grid, Tv, UserSquare2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext'; 
import api from '../services/api';
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useNotification();

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("none");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/profile/${id}`);
                setUser(res.data);
                setStatus(res.data.friendshipStatus || "none");
            } catch (err) {
                console.error("User yuklashda xato:", err);
                showToast("Foydalanuvchi ma'lumotlarini yuklab bo'lmadi", "simple");
            }
        };
        fetchUser();
    }, [id]);

    const handleAction = async () => {
        try {
            if (status === "none") {
                await api.post('/users/request', { friendId: user.id });
                setStatus("sent");
                showToast("So'rov yuborildi 💌", "simple");
            } else if (status === "sent" || status === "accepted") {
                await api.delete(`/users/unlove/${user.id}`);
                setStatus("none");
                showToast("Aloqa uzildi", "simple");
            }
        } catch (err) {
            showToast("Amalni bajarib bo'lmadi", "simple");
        }
    };

    if (!user) return <div className="loader">Yuklanmoqda...</div>;

    const getButtonConfig = () => {
        switch (status) {
            case "sent": return { text: "Requested 💌", className: "btn-pending" };
            case "accepted": return { text: "Unlove 💔", className: "btn-accepted" };
            case "received": return { text: "Accept Love ✅", className: "btn-received" };
            default: return { text: "Love ❤️", className: "btn-follow" };
        }
    };

    const btnConfig = getButtonConfig();

    return (
        <div className="full-profile-page">
            {/* --- MANA SHU QISMLAR QAYTA TIKLANDI --- */}
            <div className="profile-top-nav">
                <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                <h3 className="nav-username">{user.username}</h3>
                <MoreHorizontal />
            </div>

            <div className="profile-content">
                <div className="profile-header-main">
                    <div className="profile-avatar-container">
                        <img 
                            src={user.avatar_url || '/avatar.png'} 
                            alt="avatar" 
                            className="main-avatar" 
                        />
                    </div>
                    
                    <div className="profile-stats">
                        <div className="stat-box"><strong>--</strong><span>followers</span></div>
                        <div className="stat-box"><strong>--</strong><span>following</span></div>
                    </div>
                </div>

                <div className="profile-bio-section">
                    <h4 className="bio-name">{user.username}</h4>
                    <p className="bio-text">{user.bio || ""}</p>
                </div>
                {/* -------------------------------------- */}

                <div className="profile-actions">
                    <button
                        className={btnConfig.className}
                        onClick={status === "received" ? () => navigate('/notifications') : handleAction}
                    >
                        {btnConfig.text}
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
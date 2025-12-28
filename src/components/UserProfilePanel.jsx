import React from 'react';
import { UserPlus, MessageCircle, XCircle, Heart } from 'lucide-react';
import './UserProfilePanel.css';

const UserProfilePanel = ({ user, onClose, onFollow }) => {
    if (!user) return null;

    return (
        <div className="user-panel-overlay" onClick={onClose}>
            <div className="user-panel-content" onClick={e => e.stopPropagation()}>
                {/* Tepada kichik chiziqcha (Handle) - Instagram uslubi */}
                <div className="panel-handle" onClick={onClose}></div>
                
                <button className="close-panel" onClick={onClose}>
                    <XCircle size={28} />
                </button>
                
                <div className="panel-header">
                    <div className="avatar-wrapper">
                        <img src={user.avatar_url || '/avatar.png'} alt="avatar" />
                        <div className="heart-badge">
                            <Heart size={16} fill="white" color="white" />
                        </div>
                    </div>
                    <h3>{user.username}</h3>
                    <p className="panel-bio">{user.bio || "Salom! Men Love Island'daman."}</p>
                </div>

                <div className="panel-stats">
                    <div className="stat-item">
                        <strong>124</strong>
                        <span>Followers</span>
                    </div>
                    <div className="stat-item">
                        <strong>56</strong>
                        <span>Following</span>
                    </div>
                </div>

                <div className="panel-actions">
                    <button className="follow-btn" onClick={() => onFollow(user.id)}>
                        <UserPlus size={20} />
                        Follow
                    </button>
                    <button className="message-btn">
                        <MessageCircle size={20} />
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePanel;
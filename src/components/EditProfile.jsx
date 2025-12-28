import { useState } from 'react';
import { ArrowLeft, Check, Camera } from 'lucide-react';
import api from '../services/api';
import './EditProfile.css';

const EditProfile = ({ user, setUser, onClose }) => {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        bio: user?.bio || '',
        avatar_url: user?.avatar_url || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/users/update-profile`, formData);
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            onClose(); // Yopish
        } catch (err) {
            alert("Xatolik yuz berdi!");
        }
    };

    return (
        <div className="edit-profile-screen">
            <div className="edit-header">
                <button className="back-circle-btn" onClick={onClose}>
                    <ArrowLeft size={24} />
                </button>
                <h3>Profilni tahrirlash</h3>
                <button className="save-icon-btn" onClick={handleSubmit}>
                    <Check size={24} color="#ff4d6d" />
                </button>
            </div>

            <div className="edit-content">
                <div className="edit-avatar-section">
                    <div className="large-avatar">
                        <img src={formData.avatar_url} alt="avatar" />
                        <div className="camera-overlay">
                            <Camera size={20} color="#fff" />
                        </div>
                    </div>
                    <span>Rasmni o'zgartirish</span>
                </div>

                <form className="edit-form">
                    <div className="edit-input-group">
                        <label>Foydalanuvchi nomi</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    <div className="edit-input-group">
                        <label>Bio</label>
                        <textarea 
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="O'zingiz haqingizda yozing..."
                        />
                    </div>

                    <div className="edit-input-group">
                        <label>Avatar URL</label>
                        <input 
                            type="text" 
                            value={formData.avatar_url}
                            onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
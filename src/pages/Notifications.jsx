import { useEffect, useState } from 'react';
import { Check, X, BellOff, ArrowLeft, MessageSquare } from 'lucide-react'; // MessageSquare qo'shildi
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Notifications.css';

const Notifications = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/users/pending');
            // Backenddan: [{ id, username, avatar_url, sender_id }, ...] keladi
            setRequests(res.data);
        } catch (err) {
            console.error("Xatolik:", err);
        }
    };

    const handleAction = async (requestId, status) => {
        try {
            // requestId - bu friends jadvalidagi qatorning ID-si
            await api.post('/users/respond', { requestId, status }); 
            
            // Ro'yxatdan o'chirib tashlash
            setRequests(requests.filter(req => req.id !== requestId));
            
            if (status === 'accepted') {
                alert("Yangi juftlik hosil bo'ldi! ❤️");
            }
        } catch (err) {
            alert("Xatolik yuz berdi");
        }
    };

    return (
        <div className="notif-page">
            <div className="notif-header">
                <button onClick={() => navigate(-1)} className="back-btn"><ArrowLeft /></button>
                <h2>Bildirishnomalar</h2>
                <div style={{width: 24}}></div>
            </div>

            <div className="notif-content">
                {requests.length === 0 ? (
                    <div className="empty-state">
                        <BellOff size={60} color="#ddd" />
                        <p>Hozircha yangi so'rovlar yo'q</p>
                    </div>
                ) : (
                    requests.map(req => (
                        <div key={req.id} className="notif-item">
                            <div className="notif-avatar-wrapper">
                                <img src={req.avatar_url || '/avatar.png'} alt="user" />
                                <div className="notif-icon-badge"><MessageSquare size={12} fill="white" /></div>
                            </div>
                            
                            <div className="notif-info">
                                <strong>{req.username}</strong>
                                <span>"I've got a text!" — Siz bilan bog'lanmoqchi 💌</span>
                            </div>

                            <div className="notif-btns">
                                <button className="btn-accept" onClick={() => handleAction(req.id, 'accepted')}>
                                    <Check size={20} />
                                </button>
                                <button className="btn-reject" onClick={() => handleAction(req.id, 'rejected')}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
import { useEffect, useState } from 'react';
import { Check, X, BellOff, ArrowLeft } from 'lucide-react';
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
            setRequests(res.data);
        } catch (err) {
            console.error("Xatolik:", err);
        }
    };

    const handleAction = async (requestId, status) => {
        try {
            // Backendda buni 'respond-request' deb nomlagan bo'lishingiz mumkin
            await api.post('/users/respond', { requestId, status }); 
            setRequests(requests.filter(req => req.id !== requestId));
        } catch (err) {
            alert("Xatolik yuz berdi");
        }
    };

    return (
        <div className="notif-page">
            <div className="notif-header">
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
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
                            <img src={req.avatar_url || '/avatar.png'} alt="user" />
                            <div className="notif-info">
                                <strong>{req.username}</strong>
                                <span>Sizga juftlik so'rovini yubordi</span>
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
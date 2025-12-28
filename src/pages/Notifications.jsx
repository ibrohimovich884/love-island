import { useEffect, useState } from 'react';
import { Check, X, BellOff } from 'lucide-react';
import api from '../services/api';
import './Notifications.css';

const Notifications = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/users/pending-requests');
            setRequests(res.data);
        } catch (err) {
            console.error("Xatolik:", err);
        }
    };

    const handleAction = async (requestId, status) => {
        try {
            await api.post('/users/respond-request', { requestId, status });
            setRequests(requests.filter(req => req.id !== requestId));
            alert(status === 'accepted' ? "Juftlik tasdiqlandi! ❤️" : "Rad etildi.");
        } catch (err) {
            alert("Xatolik yuz berdi");
        }
    };

    return (
        <div className="notif-container">
            <h3 className="notif-title">Bildirishnomalar</h3>
            
            {requests.length === 0 ? (
                <div className="empty-notif">
                    <BellOff size={48} color="#ccc" />
                    <p>Hozircha yangi so'rovlar yo'q</p>
                </div>
            ) : (
                <div className="notif-list">
                    {requests.map((req) => (
                        <div key={req.id} className="notif-card">
                            <img src={req.avatar_url} alt="avatar" />
                            <div className="notif-info">
                                <strong>{req.username}</strong>
                                <p>Sizga juftlik so'rovini yubordi</p>
                            </div>
                            <div className="notif-actions">
                                <button className="accept-btn" onClick={() => handleAction(req.id, 'accepted')}>
                                    <Check size={20} />
                                </button>
                                <button className="reject-btn" onClick={() => handleAction(req.id, 'rejected')}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import api from '../services/api';
import UserPanel from '../components/UserProfilePanel'; // Yangi komponentni import qildik
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (value.length > 2) {
            setLoading(true);
            try {
                const res = await api.get(`/users/search?username=${value}`);
                setResults(res.data);
            } catch (err) {
                console.error("Qidiruvda xatolik:", err);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleFollow = async (friendId) => {
        try {
            await api.post('/users/request', { friendId });
            alert("So'rov yuborildi! ❤️");
        } catch (err) {
            alert(err.response?.data?.error || "Xatolik yuz berdi");
        }
    };

    return (
        <div className="search-page">
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <SearchIcon size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Foydalanuvchini qidirish..."
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="search-results">
                {loading && <p className="status-text">Qidirilmoqda...</p>}
                
                {results.map((u) => (
                    <div key={u.id} className="user-card" onClick={() => setSelectedUser(u)}>
                        <img src={u.avatar_url || '/avatar.png'} alt="avatar" />
                        <div className="user-card-info">
                            <h4>{u.username}</h4>
                            <p>{u.bio || "Profile ko'rish uchun bosing"}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tozalangan Modal qismi */}
            <UserPanel 
                user={selectedUser} 
                onClose={() => setSelectedUser(null)} 
                onFollow={handleFollow} 
            />
        </div>
    );
};

export default Search;
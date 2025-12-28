import { useState } from 'react';
import { Search as SearchIcon, UserPlus, Check, X } from 'lucide-react';
import api from '../services/api';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
            }
            setLoading(false);
        } else {
            setResults([]);
        }
    };

    const sendRequest = async (receiverId) => {
        try {
            await api.post('/users/friend-request', { receiverId });
            alert("So'rov yuborildi! ✨");
            // Tugmani holatini o'zgartirish uchun natijani yangilash mumkin
        } catch (err) {
            alert("So'rov yuborishda xatolik!");
        }
    };

    return (
        <div className="search-page">
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <SearchIcon size={20} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Foydalanuvchi nomini yozing..." 
                        value={query}
                        onChange={handleSearch}
                        autoFocus
                    />
                    {query && <X size={18} onClick={() => setQuery('')} className="clear-icon" />}
                </div>
            </div>

            <div className="search-results">
                {loading && <p className="status-text">Qidirilmoqda...</p>}
                
                {results.length > 0 ? (
                    results.map((u) => (
                        <div key={u.id} className="user-card">
                            <div className="user-card-info">
                                <img src={u.avatar_url} alt="avatar" />
                                <div>
                                    <h4>{u.username}</h4>
                                    <p>{u.bio || "Salom, men o'yindaman!"}</p>
                                </div>
                            </div>
                            <button onClick={() => sendRequest(u.id)} className="add-btn">
                                <UserPlus size={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    !loading && query.length > 2 && <p className="status-text">Hech kim topilmadi 😕</p>
                )}
            </div>
        </div>
    );
};

export default Search;
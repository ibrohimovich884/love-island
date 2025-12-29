import { useState } from 'react';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react'; // ArrowLeft qo'shildi
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    return (
        <div className="search-page">
            <div className="search-bar-container">
                {/* Orqaga qaytish tugmasi */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>

                <div className="search-input-wrapper">
                    <SearchIcon size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Foydalanuvchini qidirish..."
                        value={query}
                        onChange={handleSearch}
                        autoFocus /* Sahifaga kirishi bilan klaviatura ochilishi uchun */
                    />
                </div>
            </div>

            <div className="search-results">
                {loading && <p className="status-text">Qidirilmoqda...</p>}
                
                {results.map((u) => (
                    <div key={u.id} className="user-card" onClick={() => navigate(`/user/${u.id}`)}>
                        <img src={u.avatar_url || '/avatar.png'} alt="avatar" className="user-avatar" />
                        <div className="user-card-info">
                            <h4>{u.username}</h4>
                            <p>{u.bio || "Profile ko'rish uchun bosing"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
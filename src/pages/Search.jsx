import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Qo'shildi
import api from '../services/api';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hookni chaqiramiz

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
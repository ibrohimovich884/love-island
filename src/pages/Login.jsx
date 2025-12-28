import { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext'; // Context'ni import qildik
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // GLOBAL LOGIN FUNKSIYANI OLAMIZ
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Context'dagi login funksiyasini chaqiramiz
            await login(email, password);
            navigate('/home');
        } catch (err) {
            // Agar backend 400 yoki 404 qaytarsa, shu yerda tutamiz
            setError(err.response?.data?.error || "Kirishda xatolik yuz berdi");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <Heart className="heart-icon" fill="#ff4d6d" color="#ff4d6d" size={40} />
                    <h1>Xush kelibsiz</h1>
                    <p>Sizni yana ko'rganimizdan xursandmiz!</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-msg">{error}</div>}

                    <div className="input-group">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="Email manzilingiz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Parolingiz"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">Kirish</button>
                </form>

                <div className="auth-footer">
                    <span>Hali ro'yxatdan o'tmaganmisiz? </span>
                    <Link to="/register">Ro'yxatdan o'tish</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
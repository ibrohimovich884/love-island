import { useState, useContext, useEffect } from 'react'; // useEffect qo'shildi
import { AuthContext } from '../store/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // useLocation qo'shildi
import { Heart, Mail, Lock } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState(''); // Bildirishnoma uchun

    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();
    const location = useLocation(); // Registerdan kelgan state'ni olish uchun

    useEffect(() => {
        // Agar Register sahifasidan ma'lumot kelgan bo'lsa
        if (location.state) {
            if (location.state.email) setEmail(location.state.email);
            if (location.state.password) setPassword(location.state.password);
            if (location.state.message) setSuccessMsg(location.state.message);
            
            // State'ni tozalab qo'yish (sahifa yangilanganda xabarlar qolib ketmasligi uchun)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg(''); // Xabarni tozalash
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
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
                    {/* Muvaffaqiyat xabari (Pushti rangda chiroyli chiqadi) */}
                    {successMsg && <div className="success-msg" style={{color: '#2ecc71', backgroundColor: '#eafaf1', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', textAlign: 'center'}}>{successMsg}</div>}
                    
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
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Heart, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', formData);
            alert("Ro'yxatdan o'tdingiz! Endi tizimga kiring.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || "Xatolik yuz berdi");
        }
    };

    return (
        <div className="register-wrapper">
            {/* Orqaga qaytish tugmasi faqat mobil uchun qulay */}
            <Link to="/login" className="back-btn">
                <ArrowLeft size={24} />
            </Link>

            <div className="register-card">
                <div className="register-header">
                    <div className="icon-box">
                        <Heart fill="#ff4d6d" color="#ff4d6d" size={30} />
                    </div>
                    <h1>Hisob yaratish</h1>
                    <p>Sevgi sarguzashtingizni bugun boshlang</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {error && <div className="error-msg">{error}</div>}

                    <div className="input-field">
                        <User size={20} />
                        <input
                            type="text"
                            placeholder="Foydalanuvchi nomi"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="Email manzilingiz"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Parol yarating"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">Ro'yxatdan o'tish</button>
                </form>

                <div className="register-footer">
                    <span>Akauntingiz bormi? </span>
                    <Link to="/login">Kirish</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
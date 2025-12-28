import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './store/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import './App.css';

// Himoyalangan Layout (Header va Footer bilan)
const AppLayout = ({ children }) => {
  return (
    <div className="app-mobile-container">
      <Header />
      <main className="content-area">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Yuklanmoqda...</div>;
  
  // Agar user bo'lsa, uni Layout ichida qaytaramiz
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ochiq sahifalar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Himoyalangan sahifalar (Header va BottomNav bilan) */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          
          {/* Noma'lum yo'llar */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
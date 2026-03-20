import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import AvaliacaoPage from './pages/AvaliacaoPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminAwards from './pages/admin/AdminAwards';
import AdminServices from './pages/admin/AdminServices';
import AdminWhy from './pages/admin/AdminWhy';
import AdminProperties from './pages/admin/AdminProperties';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminContact from './pages/admin/AdminContact';
import AdminAvaliacao from './pages/admin/AdminAvaliacao';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import { AuthProvider, useAuth } from './lib/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">A carregar...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/avaliacao" element={<AvaliacaoPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="awards" element={<AdminAwards />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="why" element={<AdminWhy />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="avaliacao" element={<AdminAvaliacao />} />
            <Route path="submissions" element={<AdminSubmissions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

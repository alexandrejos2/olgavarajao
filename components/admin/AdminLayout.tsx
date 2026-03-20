import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { LayoutDashboard, Image, Award, Briefcase, Hop as Home, MessageSquare, Circle as HelpCircle, Phone, FileText, LogOut, Menu, X, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/hero', label: 'Hero', icon: Image },
  { to: '/admin/about', label: 'Sobre', icon: FileText },
  { to: '/admin/awards', label: 'Premios', icon: Award },
  { to: '/admin/services', label: 'Servicos', icon: Briefcase },
  { to: '/admin/why', label: 'Porque Eu', icon: ChevronRight },
  { to: '/admin/properties', label: 'Imoveis', icon: Home },
  { to: '/admin/testimonials', label: 'Testemunhos', icon: MessageSquare },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/contact', label: 'Contacto', icon: Phone },
  { to: '/admin/avaliacao', label: 'Pag. Avaliacao', icon: FileText },
  { to: '/admin/submissions', label: 'Submissoes', icon: FileText },
];

const AdminLayout: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-serif font-bold text-lg text-slate-900">Admin</h2>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <span className="font-serif font-bold text-slate-900">Admin</span>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

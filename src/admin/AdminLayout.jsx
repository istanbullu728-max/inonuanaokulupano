import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Users, Utensils, MonitorPlay, AlertTriangle, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navItems = [
        { icon: LayoutDashboard, label: "Genel Bakış", path: "/admin" },
        { icon: MonitorPlay, label: "Medya/İçerik", path: "/admin/media" },
        { icon: Megaphone, label: "Duyurular", path: "/admin/announcements" },
        { icon: Users, label: "Öğretmen Listesi", path: "/admin/teachers" },
        { icon: Utensils, label: "Yemek Menüsü", path: "/admin/menu" },
        { icon: Settings, label: "Saat/Hava Durumu", path: "/admin/settings" },
        { icon: AlertTriangle, label: "Acil Mesaj", path: "/admin/urgent" },
    ];

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Close sidebar on route change (mobile)
    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
            {/* Mobile Menu Button - Floats on top */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-indigo-100 text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all"
            >
                {isSidebarOpen ? <LogOut size={24} className="rotate-180" /> : <LayoutDashboard size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40
                w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 
                shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] 
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-8 pb-4 flex flex-col items-center">
                    {/* Logo Fix */}
                    <img
                        src="/assets/design/school_logo_admin.png"
                        alt="İnönü Anaokulu"
                        className="w-40 h-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                    />
                    <div className="mt-4 w-full flex items-center justify-center gap-2">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">YÖNETİM</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/admin"}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-[#EEF2FF] text-[#6366F1] font-bold shadow-sm ring-1 ring-[#6366F1]/10'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#6366F1] rounded-r-md"></div>}
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'text-[#6366F1]' : 'text-slate-400 group-hover:text-slate-600'} />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-100 flex flex-col gap-5 bg-white/50 backdrop-blur-sm">
                    {/* Minimalist Profile */}
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-50 flex items-center justify-center text-[#6366F1] ring-2 ring-white shadow-sm border border-indigo-100">
                            <User size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-700 truncate">{user?.username || 'Yönetici'}</p>
                            <button onClick={logout} className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 mt-0.5 group">
                                <span>Güvenli Çıkış</span>
                                <LogOut size={10} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-[#6366F1] hover:text-white transition-all text-sm font-semibold border border-slate-200 hover:border-[#6366F1] shadow-sm hover:shadow-md group"
                    >
                        <MonitorPlay size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                        Panoyu Görüntüle
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#F8FAFC] w-full relative">
                {/* Mobile Header Spacer */}
                <div className="md:hidden h-16 w-full flex items-center pl-6 bg-white border-b border-slate-100 mb-4 shadow-sm">
                    <span className="font-bold text-slate-800 text-lg">Yönetim Paneli</span>
                </div>

                <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12 pb-24 md:pb-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';

// Components
import Layout from './components/Layout';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';
import UrgentOverlay from './components/UrgentOverlay';

// Admin
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AnnouncementsManager from './admin/AnnouncementsManager';
import { TeachersManager, MenuManager } from './admin/ContentEditors';
import MediaManager from './admin/MediaManager';
import SettingsManager from './admin/SettingsManager';
import UrgentManager from './admin/UrgentManager';

// RequireAuth Component
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#f0f9ff] text-[#023047] font-bold">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const BoardView = () => {
  return (
    <Layout>
      <Header />
      <main className="flex-1 grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 overflow-hidden min-h-0 p-4 md:p-6 lg:p-8 pb-12 box-border max-h-screen">
        {/* Center Panel - Video/Media - Now wider */}
        <div className="col-span-8 h-full">
          <CenterPanel />
        </div>

        {/* Right Panel - Info Widgets */}
        <div className="col-span-4 h-full">
          <RightPanel />
        </div>
      </main>
      <Footer />
      <UrgentOverlay />
    </Layout>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BoardProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Default Redirect to Login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Explicit Board Route */}
              <Route path="/ekran" element={<BoardView />} />

              <Route path="/admin" element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }>
                <Route index element={<Dashboard />} />
                <Route path="announcements" element={<AnnouncementsManager />} />
                <Route path="teachers" element={<TeachersManager />} />
                <Route path="menu" element={<MenuManager />} />
                <Route path="media" element={<MediaManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route path="urgent" element={<UrgentManager />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BoardProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Pages
import Landing from './pages/Landing';
import AppLayout from './components/layout/AppLayout';
import StudentDashboard from './pages/StudentDashboard';
import DiagnosticPage from './pages/diagnostic/DiagnosticPage';
import DiagnosticResult from './pages/DiagnosticResult';
import CoursesPage from './pages/CoursesPage';
import MentorshipPage from './pages/MentorshipPage';
import EvaluatePage from './pages/EvaluatePage';
import MonitorDashboard from './pages/monitor/MonitorDashboard';
import StudentDetailPage from './pages/monitor/StudentDetailPage';
import RegisterMeetingPage from './pages/monitor/RegisterMeetingPage';
import MentoradosPage from './pages/monitor/MentoradosPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMonitores from './pages/admin/AdminMonitores';
import AdminCursos from './pages/admin/AdminCursos';
import AdminAvaliacoes from './pages/admin/AdminAvaliacoes';
import GoogleCallbackPage from './pages/GoogleCallbackPage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Landing page pública */}
      <Route path="/" element={<Landing />} />
      
      {/* Google OAuth Callback - rota pública */}
      <Route path="/auth/google-callback" element={<GoogleCallbackPage />} />
      
      {/* Login - rota pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Cadastro - rota pública */}
      <Route path="/cadastro" element={<CadastroPage />} />

      {/* Rotas autenticadas com layout */}
      <Route element={<AppLayout />}>
        {/* Aluno */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/diagnostico" element={<DiagnosticPage />} />
        <Route path="/resultado/:id" element={<DiagnosticResult />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/mentoria" element={<MentorshipPage />} />
        <Route path="/avaliar" element={<EvaluatePage />} />

        {/* Monitor */}
        <Route path="/monitor" element={<MonitorDashboard />} />
        <Route path="/monitor/mentorados" element={<MentoradosPage />} />
        <Route path="/monitor/aluno/:userId" element={<StudentDetailPage />} />
        <Route path="/monitor/encontro/:mentoradoId" element={<RegisterMeetingPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/monitores" element={<AdminMonitores />} />
        <Route path="/admin/cursos" element={<AdminCursos />} />
        <Route path="/admin/avaliacoes" element={<AdminAvaliacoes />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
import { useEffect, useState } from 'react';
import { authService } from '../api/auth';

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState('Processando login com Google...');

  useEffect(() => {
    try {
      const success = authService.handleGoogleCallback();
      if (success) {
        setStatus('Login realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      } else {
        setStatus('Erro ao processar login. Redirecionando...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      setStatus('Erro inesperado. Redirecionando...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 text-lg">{status}</p>
    </div>
  );
}
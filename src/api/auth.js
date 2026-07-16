import { apiClient } from './client';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  UPDATE_ME: '/auth/me',
};

class AuthService {
  async me() {
    try {
      const user = await apiClient.get(AUTH_ENDPOINTS.ME);
      return user;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        throw error;
      }
      throw error;
    }
  }

  async login(email, password) {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    if (response.token) {
      localStorage.setItem('access_token', response.token);
    }
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  async register(data) {
    // Limpa tokens anteriores antes de cadastrar
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data);
    if (response.token) {
      localStorage.setItem('access_token', response.token);
    }
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  logout(redirectUrl = '/') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  redirectToLogin(redirectUrl = window.location.href) {
    window.location.href = '/login';
  }

  async updateMe(data) {
    const user = await apiClient.patch(AUTH_ENDPOINTS.UPDATE_ME, data);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  getStoredUser() {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getGoogleAuthUrl() {
    return '/api/auth/google';
  }

  handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      localStorage.setItem('access_token', token);
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(user));
      } catch {
        localStorage.setItem('user', userParam);
      }
      return true;
    }
    return false;
  }
}

export const authService = new AuthService();

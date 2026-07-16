export const appParams = {
  appId: import.meta.env.VITE_APP_ID || null,
  token: localStorage.getItem('access_token') || null,
};
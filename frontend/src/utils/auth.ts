export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !! token;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/auth';
  // window.location.href = '/auth';
};
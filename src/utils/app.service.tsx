import axios from 'axios';

export const fetchProtectedData = () => {
  const token = localStorage.getItem('token');
  

  return axios.get('/api/protectedRoute', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// frontend/src/pages/GoogleRedirect.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const GoogleRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const errorParam = params.get('error');

      if (errorParam) {
        toast.error(`Login Google dibatalkan atau gagal: ${errorParam}`);
        navigate('/login');
        return;
      }

      if (code) {
        try {
          // Kirim kode otorisasi ke backend Anda untuk pertukaran token
          // Sesuaikan endpoint ini dengan backend Anda, misal /api/auth/google/callback
          const response = await api.post('/api/auth/google/callback', { code }); 
          const { token } = response.data; // Asumsi backend mengembalikan token
          
          localStorage.setItem('token', token);
          
          toast.success('Login Google berhasil!');
          navigate('/');
        } catch (error: any) {
          console.error('❌ Login Google gagal:', error);
          toast.error(error?.response?.data?.message || 'Login Google gagal. Silakan coba lagi.');
          navigate('/login');
        }
      } else {
        toast.error('Tidak ada kode otorisasi dari Google. Silakan coba lagi.');
        navigate('/login');
      }
    };

    handleGoogleLogin();
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-medium text-gray-700">Memproses login Google Anda...</p>
        <p className="text-sm text-gray-500 mt-2">Mohon tunggu sebentar.</p>
      </div>
    </div>
  );
};

export default GoogleRedirect;
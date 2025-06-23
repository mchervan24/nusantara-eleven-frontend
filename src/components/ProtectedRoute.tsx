// frontend/src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error("Anda harus login untuk mengakses halaman ini.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
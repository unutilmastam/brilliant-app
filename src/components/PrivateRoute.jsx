import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-ivory/50">Yuklanmoqda...</div>;
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

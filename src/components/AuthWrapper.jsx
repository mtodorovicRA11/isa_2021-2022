import React from 'react'
import { Navigate } from 'react-router';
import { getToken } from '../api/axiosInstance'

const AuthWrapper = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default AuthWrapper

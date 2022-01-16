import React from 'react'
import { Navigate } from 'react-router';
import { getToken, getRole } from '../api/axiosInstance'

const AuthWrapper = ({ children }) => {
  const token = getToken();
  const role = getRole();


  if (!token || children.props.required_role && role != children.props.required_role) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default AuthWrapper

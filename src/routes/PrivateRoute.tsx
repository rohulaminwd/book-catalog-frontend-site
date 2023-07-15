
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {

  const location = useLocation();
  const usertoken = localStorage.getItem("accessToken");

  if (!usertoken) {
    return (
      <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
  }

  return children;
}

import { useAuth0 } from "@auth0/auth0-react";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // While Auth0 is checking auth state
  if (isLoading) {
    return null;
  }

  // If not logged in, redirect to landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

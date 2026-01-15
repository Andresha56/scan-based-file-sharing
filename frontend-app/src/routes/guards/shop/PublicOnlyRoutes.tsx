import { Navigate } from "react-router-dom";
import { authStore } from "@store/auth.store";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = authStore(
    (state) => state.isAuthenticated
  );
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
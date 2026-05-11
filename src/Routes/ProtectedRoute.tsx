import { type ReactElement } from "react";
import { useAuthStore } from "../lib/authStore";
import { Navigate } from "react-router-dom";
export function ProtectedRoute({ children }: { children: ReactElement }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

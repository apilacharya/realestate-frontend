import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;

import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../stores/auth/auth.store';
import { routes } from '../../config/Router/routes';
import Layout from '../../components/Layout/Layout';

const ProtectedRoute = () => {
  const { isUserAuthenticated } = useAuthStore();

  if (!isUserAuthenticated) {
    return <Navigate to={routes.loginPage} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;

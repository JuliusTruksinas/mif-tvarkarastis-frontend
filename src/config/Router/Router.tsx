import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth/auth.store';
import ProtectedRoute from '../../common/ProtectedRoute/ProtectedRoute';

import { routes } from './routes';
import AboutUsPage from '../../pages/public/AboutUsPage/AboutUsPage';
import LoginPage from '../../pages/public/LoginPage/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage/RegisterPage';
import UserSettingsPage from '../../pages/public/UserPage/UserSettingsPage';
import CalendarPage from '../../pages/public/CalendarPage/CalendarPage';
import FriendsPage from '../../pages/public/FriendsPage/FriendsPage';
import LoadingPage from '../../pages/public/LoadingPage/LoadingPage';
import ForgotPasswordPage from '../../pages/public/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/public/ResetPasswordPage/ResetPasswordPage';

const getAuthenticatedRoutes = () => {
  return (
    <Route element={<ProtectedRoute />}>
      <Route path={routes.aboutUs} element={<AboutUsPage />} />
      <Route path={routes.calendar} element={<CalendarPage />} />;
      <Route path={routes.friendsPage} element={<FriendsPage />} />
      <Route path={routes.userSettingsPage} element={<UserSettingsPage />} />
      <Route path={'*'} element={<Navigate to={routes.calendar} replace />} />
    </Route>
  );
};

const getUnauthenticatedRoutes = () => {
  return (
    <>
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.registerPage} element={<RegisterPage />} />
      <Route path={routes.resetPasswordPage} element={<ResetPasswordPage />} />
      <Route
        path={routes.forgotPasswordPage}
        element={<ForgotPasswordPage />}
      />
      <Route path={'*'} element={<Navigate to={routes.loginPage} replace />} />
    </>
  );
};

const Router = () => {
  const { isUserAuthenticated, tryAutoLogin, isUserAuthenticationLoading } =
    useAuthStore();

  useEffect(() => {
    tryAutoLogin();
  }, []);

  if (isUserAuthenticationLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        {isUserAuthenticated
          ? getAuthenticatedRoutes()
          : getUnauthenticatedRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

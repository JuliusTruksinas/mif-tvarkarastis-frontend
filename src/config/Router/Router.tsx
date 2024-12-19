import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth/auth.store';
import ProtectedRoute from '../../common/ProtectedRoute/ProtectedRoute';

import { routes } from './routes';
import HomePage from '../../pages/public/HomePage/HomePage';
import LoginPage from '../../pages/public/LoginPage/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage/RegisterPage';
import UserPage from '../../pages/public/UserPage/UserPage';
import CalendarPage from '../../pages/public/CalendarPage/CalendarPage';
import FriendsPage from '../../pages/public/FriendsPage/FriendsPage';

const getProtectedRoutes = () => {
  return (
    <Route element={<ProtectedRoute />}>
      <Route path={routes.calendar} element={<CalendarPage />} />;
      <Route path={routes.friendsPage} element={<FriendsPage />} />
      <Route path={routes.userPage} element={<UserPage />} />
    </Route>
  );
};

const getRoutes = () => {
  return (
    <>
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.registerPage} element={<RegisterPage />} />
      <Route path={'*'} element={<Navigate to={routes.homePage} />} />
    </>
  );
};

const Router = () => {
  const { isUserAuthenticated, tryAutoLogin } = useAuthStore();

  useEffect(() => {
    tryAutoLogin();
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        {getRoutes()}
        {isUserAuthenticated && getProtectedRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

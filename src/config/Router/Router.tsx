import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
// import HomePage from '../../pages/public/HomePage'; TODO: create HomePage
import LoginPage from '../../pages/public/LoginPage/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage/RegisterPage';
import ExamplePage from '../../pages/public/ExamplePage';
import CalendarPage from '../../pages/public/CalendarPage/CalendarPage';
import { useAuthStore } from '../../stores/auth/auth.store';
import { useEffect } from 'react';

const getProtectedRoutes = () => {
  return (
    <>
      <Route path={routes.calendar} element={<CalendarPage />} />
    </>
  );
};

const getRoutes = () => {
  return (
    <>
      <Route path={routes.homePage} element={<LoginPage />} />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.registerPage} element={<RegisterPage />} />
      <Route path={routes.examplePage} element={<ExamplePage />} />
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

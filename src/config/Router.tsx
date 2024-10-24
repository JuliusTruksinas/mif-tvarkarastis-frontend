import react from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

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
  return (
    <BrowserRouter basename="/">
      <Routes>{getRoutes()}</Routes>
    </BrowserRouter>
  );
};
export default Router;

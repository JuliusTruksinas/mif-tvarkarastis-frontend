import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import HomePage from '../../pages/public/HomePage';
import LoginPage from '../../pages/public/LoginPage/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage/RegisterPage';
import ExamplePage from '../../pages/public/ExamplePage';
import CalendarPage from '../../pages/public/CalendarPage/CalendarPage';

const getRoutes = () => {
  return (
    <>
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.registerPage} element={<RegisterPage />} />
      <Route path={routes.calendar} element={<CalendarPage />} />
      <Route path={routes.examplePage} element={<ExamplePage />} />
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

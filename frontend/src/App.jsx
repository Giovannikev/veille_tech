import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChatBotPage from './pages/chatbot/ChatBotPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import Home from './pages/home/Home';
import Navbar from './components/widgets/Navbar';
import Footer from './components/widgets/Footer';
import RestaurantListPage from './pages/restaurant/restaurant_list/RestaurantListPage';
import RestaurantDetailPage from './pages/restaurant/restaurant_detail/RestaurantDetailPage';
import RestaurantFormulaire from './pages/restaurant/restaurant_form/RestaurantFormulaire';
import ProfilePage from './pages/profile/ProfilePage';
import TicketPage from './pages/ticket/TicketPage';
import ReservationFormulaire from './pages/reservation/ReservationFormulaire';
import DashboardPage from './pages/dashboard/DashboardPage';
import ResetPasswordPage from './pages/login/ResetPasswordPage';
import ResetPasswordPageConfirm from './pages/login/ResetPasswordPageConfirm';
import ActivatePage from './pages/others/ActivatePage';
import NotFoundPage from './pages/others/NotFoundPage';
import PayementPage from './pages/suscribe/PaymentPage';
import PlansPage from './pages/suscribe/PlansPage';
function App() {
  return (
    <>
      <Router>
        <Main />
      </Router>
      <ToastContainer />
    </>
  );
}
function Main() {
  const location = useLocation();
  const noNavbarPaths = ['/login', '/signup'];
  const noFooterPaths = ['/login', '/signup'];
  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/payment" element={<PayementPage />} />
        <Route path="/plans" element={<PlansPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset_password" element={<ResetPasswordPage />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPageConfirm />} />
        <Route path="/restaurant/formulaire" element={<RestaurantFormulaire />} />
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/all" element={<RestaurantListPage />} />
        <Route path="/restaurant/detail/:id" element={<RestaurantDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/reservation/:id" element={<ReservationFormulaire />} />
        <Route path="/dashboard/:id" element={<DashboardPage />} />
        <Route path="/activate/:uid/:token" element={<ActivatePage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      {!noFooterPaths.includes(location.pathname) && <Footer />}


    </>
  );
}


export default App;

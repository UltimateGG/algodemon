import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JetDesign from './Jet/theme/JetDesign';
import Navbar from './components/Navbar';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import PricingPage from './pages/PricingPage';
import TutorialPage from './pages/TutorialPage';
import TOSPage from './pages/TOSPage';
import { PAYPAL_CLIENT_ID } from './globals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/admin/Login';
import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { SessionTrackerProvider } from './contexts/SessionTrackerContext';
import SessionExplorer from './pages/admin/sessionExplorer/SessionExplorer';
import AdminPage from './pages/admin/AdminPanel';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <JetDesign>
        <HashRouter>
          <SessionTrackerProvider>
            <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID, 'disable-funding': 'credit', 'currency': 'USD' }}>
              <ScrollToTop />
              <AuthProvider>
                <NotificationProvider>
                  <Navbar />

                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="pricing" element={<PricingPage />} />
                    <Route path="success" element={<SuccessPage />} />
                    <Route path="tutorial" element={<TutorialPage />} />
                    <Route path="tos" element={<TOSPage />} />

                    <Route path="admin/login" element={<LoginPage />} />
                    <Route path="admin/dashboard" element={<AdminPage />} />
                    <Route path="admin/sessions" element={<SessionExplorer />} />

                    <Route path="*" element={<Page404 />} />
                  </Routes>

                  <Footer />
                </NotificationProvider>
              </AuthProvider>
            </PayPalScriptProvider>
          </SessionTrackerProvider>
        </HashRouter>
    </JetDesign>
  </React.StrictMode>
);

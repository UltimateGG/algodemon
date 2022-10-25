import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JetDesign from './Jet/theme/JetDesign';
import Navbar from './components/Navbar';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import TutorialPage from './pages/TutorialPage';
import TOSPage from './pages/TOSPage';
import { PAYPAL_CLIENT_ID } from './globals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import SuccessPage from './pages/SuccessPage';
import AffiliatePage from './pages/affiliates/AffiliatePage';
import LoginPage from './pages/affiliates/Login';
import DashboardPage from './pages/affiliates/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { SessionTrackerProvider } from './contexts/SessionTrackerContext';
import SessionExplorer from './pages/admin/sessionExplorer/SessionExplorer';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <JetDesign>
      <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID, 'disable-funding': 'credit', 'currency': 'USD' }}>
        <HashRouter>
          <SessionTrackerProvider>
            <ScrollToTop />
            <AuthProvider>
              <NotificationProvider>
                <Navbar />

                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="success" element={<SuccessPage />} />
                  <Route path="tutorial" element={<TutorialPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="affiliates" element={<AffiliatePage />} />
                  <Route path="tos" element={<TOSPage />} />

                  <Route path="login" element={<LoginPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  
                  <Route path="admin/sessions" element={<SessionExplorer />} />

                  <Route path="*" element={<Page404 />} />
                </Routes>

                <Footer />
              </NotificationProvider>
            </AuthProvider>
          </SessionTrackerProvider>
        </HashRouter>
      </PayPalScriptProvider>
    </JetDesign>
  </React.StrictMode>
);

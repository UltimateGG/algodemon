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
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from './globals';
import { Elements } from '@stripe/react-stripe-js';
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
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

root.render(
  <React.StrictMode>
    <JetDesign>
      <Elements stripe={stripePromise}>
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
      </Elements>
    </JetDesign>
  </React.StrictMode>
);

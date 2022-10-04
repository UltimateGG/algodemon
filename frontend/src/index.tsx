import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

root.render(
  <React.StrictMode>
    <JetDesign>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tos" element={<TOSPage />} />
            <Route path="/success" element={<SuccessPage />} />
            
            <Route path="*" element={<Page404 />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Elements>
    </JetDesign>
  </React.StrictMode>
);

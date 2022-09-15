import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JetDesign from './Jet/theme/JetDesign';
import Navbar from './components/Navbar';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import BuyPage from './pages/BuyPage';
import TutorialPage from './pages/TutorialPage';
import TOSPage from './pages/TOSPage';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <JetDesign>
      <BrowserRouter>
        <Navbar />

          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tos" element={<TOSPage />} />
          
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </JetDesign>
  </React.StrictMode>
);

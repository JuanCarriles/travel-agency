import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import Header from './sections/Header';
import Home from './pages/Home';
import ModuleDetail from './pages/ModuleDetail';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InstagramButton from './components/InstagramButton';
import FacebookButton from './components/FacebookButton';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F3EE] overflow-x-hidden">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules/:moduleId" element={<ModuleDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating Social Buttons */}
        <FacebookButton
          pageUrl="https://www.facebook.com/people/Gates-to-Argentina/61588040902492/"
        />
        <InstagramButton
        />
        <WhatsAppButton
          phoneNumber="543813598639"
          message=""
        />
      </div>
    </Router>
  );
}

export default App;
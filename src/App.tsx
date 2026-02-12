import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import Header from './sections/Header';
import Home from './pages/Home';
import ModuleDetail from './pages/ModuleDetail';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import GroupMeButton from './components/GroupMeButton';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F3EE]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules/:moduleId" element={<ModuleDetail />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating Social Buttons */}
        <GroupMeButton
          groupUrl="https://groupme.com/join_group/YOUR_GROUP_ID/YOUR_TOKEN"
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
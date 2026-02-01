import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Destinations from './sections/Destinations';
import Services from './sections/Services';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

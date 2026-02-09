import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

// Array of background images - Add or remove images here
const backgroundImages = [
  '/images/RecorriendoJujuy.png',
  '/images/desert-arg.webp',
  '/images/hero-patagonia.jpg',
  // Add more images here as needed
];

export default function Hero() {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds - adjust as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Carousel with Parallax */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
            }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#494242ea]/80 via-[#494242ea]/50 to-[#494242ea]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div
          className={`transition-all duration-1000 ${isLoaded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#EFB4A7] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium hero-text-shadow">
              Israel - Argentina - USA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight hero-text-shadow">                  {t('hero.title').split(' ').map((word, index) =>
            index === t('hero.title').split(' ').length - 1 ? (
              <span key={index} className="text-[#EFB4A7]">
                {word}
              </span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
          </h1>

          {/* Subtitle */}
          <strong><p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed hero-text-shadow">
            {t('hero.subtitle')}
          </p></strong>

          {/* Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed hero-text-shadow">
            {t('hero.text')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="hero-text-shadow group relative bg-[#EFB4A7] hover:bg-[#EFB9B0] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#EFB4A7]/30 overflow-hidden"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="hero-text-shadow absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </a>
            <a
              href="#destinations"
              className="hero-text-shadow text-white border-2 border-white/30 hover:border-[#EFB4A7] hover:text-[#EFB4A7] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hero-text-shadow"
            >
              {t('nav.destinations')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#destinations"
          className="flex flex-col items-center text-white/60 hover:text-[#EFB4A7] transition-colors duration-300"
        >
          <span className="text-sm mb-2 hero-text-shadow">{t('nav.destinations')}</span>
          <ChevronDown className="w-6 h-6 hero-text-shadow" />
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#EFB4A7] rounded-full opacity-60" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-[#EFB4A7] rounded-full opacity-40" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30" />
    </section>
  );
}

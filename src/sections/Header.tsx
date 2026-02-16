import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { languages } from '@/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'he' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { key: 'home', href: '/#home' },
    { key: 'destinations', href: '/#modules' },
    { key: 'services', href: '/#services' },
    { key: 'about', href: '/#about' },
    { key: 'contact', href: '/#contact' },
  ];

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#858585ea]/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/#home" className="flex items-center gap-3">
            {/* Mobile: full logo */}
            <img

              src="/images/LOGO-DEFINITIVO.png"

              alt="Gates to argentina logo"
              className="h-12 w-auto object-contain sm:hidden"
            />
            {/* Desktop: simplified logo + text */}
            <img

              src="/images/LOGO-DEFINITIVO.png"

              alt="Gates to argentina logo"
              className="h-12 w-auto object-contain hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-white/90 hover:text-[#9FBCD4] transition-colors duration-300 text-sm font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Language Selector & CTA */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#9FBCD4] hover:bg-white/10 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLanguage.flag}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/#contact"
              className="hidden md:inline-flex bg-[#9FBCD4] hover:bg-[#7cb2dd] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#9FBCD4]/30 drop-shadow-lg"
            >
              {t('hero.cta')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#858585ea]/98 backdrop-blur-md rounded-b-2xl pb-6">
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/90 hover:text-[#9FBCD4] hover:bg-white/5 transition-all duration-300 py-3 px-4 rounded-lg text-base font-medium"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#9FBCD4] hover:bg-[#7cb2dd] text-white text-center py-3 px-4 rounded-lg text-base font-medium mt-2 transition-all duration-300 drop-shadow-lg"
              >
                {t('hero.cta')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import { useState, useEffect } from 'react';
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
    { key: 'home', href: '#home' },
    { key: 'destinations', href: '#destinations' },
    { key: 'services', href: '#services' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ];

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#848484]/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/images/gates-to-arg-LOGO-SIMPLIFICADO.png"
              alt="Andes Journey Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-white font-semibold text-xl hidden sm:block">
              Gates To Argentina
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-white/90 hover:text-[#EFB4A7] transition-colors duration-300 text-sm font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Language Selector & CTA */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#EFB4A7] hover:bg-white/10 flex items-center gap-2"
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

            <a
              href="#contact"
              className="hidden md:inline-flex bg-[#EFB4A7] hover:bg-[#EFB9B0] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#EFB4A7]/30"
            >
              {t('hero.cta')}
            </a>

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
          <div className="lg:hidden bg-[#848484]/98 backdrop-blur-md rounded-b-2xl pb-6">
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/90 hover:text-[#EFB4A7] hover:bg-white/5 transition-all duration-300 py-3 px-4 rounded-lg text-base font-medium"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#EFB4A7] hover:bg-[#EFB9B0] text-white text-center py-3 px-4 rounded-lg text-base font-medium mt-2 transition-all duration-300"
              >
                {t('hero.cta')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
} from 'lucide-react';
import { useModulesData } from '@/hooks/useModulesData';
import i18n from '@/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const { modules } = useModulesData();

  const quickLinks = [
    { key: 'home', href: '/#home' },
    { key: 'destinations', href: '/#modules' },
    { key: 'services', href: '/#services' },
    { key: 'about', href: '/#about' },
    { key: 'contact', href: '/#contact' },
  ];

  const destinations = modules.map(module => ({
    id: module.id,
    href: `/modules/${module.id}`,
    name: module.name
  }));

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/gatestoargentina/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/people/Gates-to-Argentina/61588040902492/', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/543813598639', label: 'WhatsApp' },
    { icon: null, href: 'https://groupme.com/contact/101879750/UfDn3LFL', label: 'GroupMe', isGroupMe: true },
  ];

  return (
    <footer className="bg-[#858585ea] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <img
                src="/images/gates-to-arg-LOGO-COMPLETO-WHITE.png"
                alt="Gates to argentina logo"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-white/70 leading-relaxed mb-6" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#EFB4A7] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.isGroupMe ? (
                      <img src="/images/groupme-icon.png" alt="GroupMe" className="w-5 h-5" />
                    ) : (
                      social.icon && <social.icon className="w-5 h-5" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {t('footer.destinations')}
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.id}>
                  <a
                    href={dest.href}
                    className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {dest.name[i18n.language as keyof typeof dest.name] || dest.name.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              {/* Argentina */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EFB4A7] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  <p className="font-medium text-white">{t('contact.offices.argentina')}</p>
                  <p>{t('contact.offices.argentinaLocation')}</p>
                  <p>{t('contact.offices.argentinaPhone')}</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#EFB4A7] flex-shrink-0" />
                <a
                  href="mailto:gloria@gatestoargentina.com"
                  className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300 text-sm"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  gloria@gatestoargentina.com
                </a>
              </li>
              {/* Israel */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EFB4A7] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  <p className="font-medium text-white">{t('contact.offices.israel')}</p>
                  <p>{t('contact.offices.israelLocation')}</p>
                  <p>{t('contact.offices.israelPhone')}</p>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              © 2026 Gates to Argentina. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

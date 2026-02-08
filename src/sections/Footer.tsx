import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'destinations', href: '#destinations' },
    { key: 'services', href: '#services' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ];

  const destinations = [
    { key: 'noa', href: '#destinations' },
    { key: 'buenosaires', href: '#destinations' },
    { key: 'patagonia', href: '#destinations' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-[#848484] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <img
                src="/images/gates-to-arg-LOGO-SIMPLIFICADO.png"
                alt="Gates to argentina logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-white font-semibold text-xl">
                Gates to argentina
              </span>
            </a>
            <p className="text-white/70 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#EFB4A7] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]">
              {t('footer.destinations')}
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.key}>
                  <a
                    href={dest.href}
                    className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300"
                  >
                    {t(`destinations.${dest.key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFB4A7]">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EFB4A7] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p className="font-medium text-white">Israel (HQ)</p>
                  <p>Tel Aviv, Israel</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EFB4A7] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p className="font-medium text-white">Argentina</p>
                  <p>Tucumán, Argentina</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EFB4A7] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p className="font-medium text-white">USA</p>
                  <p>New York, NY</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#EFB4A7] flex-shrink-0" />
                <a
                  href="mailto:info@andesjourney.com"
                  className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300 text-sm"
                >
                  info@andesjourney.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#EFB4A7] flex-shrink-0" />
                <a
                  href="tel:+97231234567"
                  className="text-white/70 hover:text-[#EFB4A7] transition-colors duration-300 text-sm"
                >
                  +972-3-123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2024 Andes Journey. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/50 hover:text-[#EFB4A7] text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-[#EFB4A7] text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

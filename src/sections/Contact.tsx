import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const offices = [
  {
    key: 'israel',
    location: 'Tel Aviv',
    phone: '+972-3-123-4567',
  },
  {
    key: 'argentina',
    location: 'Tucumán',
    phone: '+54-381-123-4567',
  },
  {
    key: 'usa',
    location: 'New York',
    phone: '+1-212-123-4567',
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    people: '',
    destination: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        people: '',
        destination: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/images/contact-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#1A3A52]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#C9A962]" />
            <span className="text-[#C9A962] text-sm font-semibold uppercase tracking-wider">
              Contacto
            </span>
            <div className="w-12 h-[2px] bg-[#C9A962]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">
                    {t('contact.success')}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#2D2D2D]">
                        {t('contact.name')}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#2D2D2D]">
                        {t('contact.email')}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#2D2D2D]">
                        {t('contact.phone')}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962]"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="people" className="text-[#2D2D2D]">
                        {t('contact.people')}
                      </Label>
                      <Input
                        id="people"
                        name="people"
                        type="number"
                        min="15"
                        max="20"
                        value={formData.people}
                        onChange={handleChange}
                        className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962]"
                        placeholder="15-20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-[#2D2D2D]">
                      {t('contact.destination')}
                    </Label>
                    <Select
                      value={formData.destination}
                      onValueChange={(value) =>
                        setFormData({ ...formData, destination: value })
                      }
                    >
                      <SelectTrigger className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962]">
                        <SelectValue placeholder={t('contact.destination')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="noa">
                          {t('destinations.noa.title')}
                        </SelectItem>
                        <SelectItem value="buenosaires">
                          {t('destinations.buenosaires.title')}
                        </SelectItem>
                        <SelectItem value="patagonia">
                          {t('destinations.patagonia.title')}
                        </SelectItem>
                        <SelectItem value="combined">
                          Combined Tour
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#2D2D2D]">
                      {t('contact.message')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="border-[#2D2D2D]/20 focus:border-[#C9A962] focus:ring-[#C9A962] resize-none"
                      placeholder="Tell us about your dream trip..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#C9A962] hover:bg-[#B8964F] text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A962]/30"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.send')}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Offices Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {t('contact.offices.title')}
              </h3>

              {offices.map((office) => (
                <div
                  key={office.key}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C9A962] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {t(`contact.offices.${office.key}`)}
                      </h4>
                      <p className="text-white/70 text-sm mb-2">
                        {office.location}
                      </p>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Phone className="w-4 h-4" />
                        {office.phone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Email */}
              <div className="bg-[#C9A962]/20 backdrop-blur-sm border border-[#C9A962]/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#C9A962] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:info@andesjourney.com"
                      className="text-[#C9A962] hover:text-white transition-colors duration-300"
                    >
                      info@andesjourney.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

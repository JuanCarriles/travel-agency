import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
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
import { useModulesData } from '@/hooks/useModulesData';
import i18n from '@/i18n';
import { smtpexpressClient, SENDER_EMAIL } from '@/lib/smtp';
import { toast } from 'sonner';

const offices = [
  {
    key: 'israel',
    location: 'Tel Aviv',
    phone: '+972546787997',
    email: 'glo.israel@gmail.com',
  },
  {
    key: 'argentina',
    location: 'Tucumán',
    phone: '0381 3598639',
    email: 'gloria.gta.office@gmail.com ',
  }
];

export default function Contact() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { modules } = useModulesData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasError(false);

    try {
      const destinationName = formData.destination
        ? modules.find((m) => m.id === formData.destination)?.name[
        i18n.language as keyof (typeof modules)[0]['name']
        ] || formData.destination
        : t('contact.noDestination');

      const result = await smtpexpressClient.sendApi.sendMail({
        subject: `Nuevo contacto: ${formData.name} — ${destinationName}`,
        message: `
          <h2>Nuevo mensaje de contacto</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; font-weight: bold;">Nombre:</td><td style="padding: 8px;">${formData.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${formData.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Teléfono:</td><td style="padding: 8px;">${formData.phone || 'No proporcionado'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Destino:</td><td style="padding: 8px;">${destinationName}</td></tr>
          </table>
          <h3>Mensaje:</h3>
          <p>${formData.message || 'Sin mensaje'}</p>
        `,
        sender: {
          name: 'Andes Journey Contact Form',
          email: SENDER_EMAIL,
        },
        recipients: {
          email: 'gloria@gatestoargentina.com',
        },
      });
      console.log('SMTP Express response:', result);

      setIsSubmitted(true);

    } catch (error) {
      console.error('Email send error:', error);
      setHasError(true);
      toast.error(t('contact.error'));
    } finally {
      setIsLoading(false);
    }
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
        <div className="absolute inset-0 bg-[#494242ea]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#EFB4A7]" />
            <span className="text-[#EFB4A7] text-sm font-semibold uppercase tracking-wider">
              Contacto
            </span>
            <div className="w-12 h-[2px] bg-[#EFB4A7]" />
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
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible
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
              ) : hasError ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">
                    {t('contact.error')}
                  </h3>
                  <Button
                    onClick={() => setHasError(false)}
                    className="mt-4 bg-[#EFB4A7] hover:bg-[#EFB9B0] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    {t('contact.retry')}
                  </Button>
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
                        className="border-[#2D2D2D]/20 focus:border-[#EFB4A7] focus:ring-[#EFB4A7]"
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
                        className="border-[#2D2D2D]/20 focus:border-[#EFB4A7] focus:ring-[#EFB4A7]"
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
                        className="border-[#2D2D2D]/20 focus:border-[#EFB4A7] focus:ring-[#EFB4A7]"
                        placeholder="+1 234 567 890"
                      />
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
                        <SelectTrigger className="border-[#2D2D2D]/20 focus:border-[#EFB4A7] focus:ring-[#EFB4A7]">
                          <SelectValue placeholder={t('contact.destination')} />
                        </SelectTrigger>
                        <SelectContent>
                          {modules.map((module) => (
                            <SelectItem key={module.id} value={module.id}>
                              {module.name[i18n.language as keyof typeof module.name] || module.name.en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                      required
                      rows={4}
                      className="border-[#2D2D2D]/20 focus:border-[#EFB4A7] focus:ring-[#EFB4A7] resize-none"
                      placeholder="Tell us about your dream trip..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#EFB4A7] hover:bg-[#EFB9B0] text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#EFB4A7]/30 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isLoading ? t('contact.sending') : t('contact.send')}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Offices Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${isVisible
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
                    <div className="w-10 h-10 bg-[#EFB4A7] rounded-lg flex items-center justify-center flex-shrink-0">
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
                      <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${office.email}`} className="hover:text-[#EFB4A7] transition-colors duration-300">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Email */}
              <div className="bg-[#EFB4A7]/20 backdrop-blur-sm border border-[#EFB4A7]/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFB4A7] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:gloria@gatestoargentina.com"
                      className="text-[#EFB4A7] hover:text-white transition-colors duration-300"
                    >
                      gloria@gatestoargentina.com
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

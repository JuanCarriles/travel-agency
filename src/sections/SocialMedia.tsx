import { useTranslation } from 'react-i18next';
import { Facebook, Instagram } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SocialMedia() {
    const { t } = useTranslation();
    const { ref, isVisible } = useScrollAnimation<HTMLElement>();

    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://www.facebook.com/people/Gates-to-Argentina/61588040902492/',
            bgGradient: 'bg-gradient-to-br from-[#1877F2]/90 to-[#0D65D9]/90',
            hoverBg: 'hover:from-[#1877F2] hover:to-[#0D65D9]',
            iconColor: 'text-white',
            glowColor: 'bg-[#1877F2]'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            url: 'https://www.instagram.com/gatestoargentina',
            bgGradient: 'bg-gradient-to-br from-[#E4405F]/90 via-[#9B4FAD]/90 to-[#405DE6]/90',
            hoverBg: 'hover:from-[#E4405F] hover:via-[#9B4FAD] hover:to-[#405DE6]',
            iconColor: 'text-white',
            glowColor: 'bg-[#E4405F]'
        }
    ];

    return (
        <section
            ref={ref}
            className="py-20 md:py-32 bg-[#232121fa] relative overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874")',
                        opacity: 0.15
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#232121fa] via-[#232121dd] to-[#232121fa]" />
            </div>

            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                        <span className="text-[#9FBCD4] text-sm font-semibold uppercase tracking-wider">
                            {t('nav.contact') || 'Conecta'}
                        </span>
                        <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        {t('socialMedia.title') || 'Visítanos en Nuestras Redes Sociales'}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md">
                        {t('socialMedia.subtitle') || 'Síguenos para más contenido, fotos y actualizaciones de nuestros viajes'}
                    </p>
                </div>

                {/* Social Media Cards */}
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                            }}
                        >
                            <div className="relative h-full">
                                {/* Card Background with Gradient */}
                                <div
                                    className={`${social.bgGradient} ${social.hoverBg} backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-10 h-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[#9FBCD4]/20 group-hover:border-white/40`}
                                >
                                    {/* Icon Container */}
                                    <div className="relative mb-6 flex justify-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                                            <social.icon className={`w-10 h-10 md:w-12 md:h-12 ${social.iconColor} drop-shadow-lg`} />
                                        </div>
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full ${social.glowColor} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                                            {social.name}
                                        </h3>
                                        <p className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md">
                                            {t(`socialMedia.${social.name.toLowerCase()}Text`) || `Síguenos en ${social.name}`}
                                        </p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-4 right-4 w-8 h-[2px] bg-white/50" />
                                        <div className="absolute top-4 right-4 w-[2px] h-8 bg-white/50" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute bottom-4 left-4 w-8 h-[2px] bg-white/50" />
                                        <div className="absolute bottom-4 left-4 w-[2px] h-8 bg-white/50" />
                                    </div>
                                </div>

                                {/* External Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

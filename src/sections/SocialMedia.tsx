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
            className="py-16 md:py-24 relative overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/PORTADA FACEBOOK GATES TO ARGENTINA.jpg")',
                        opacity: 1
                    }}
                />
                {/* Subtle overlay to enhance text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
                {/* Vignette effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title - positioned at the top */}
                <div
                    className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight">
                        {t('socialMedia.title') || '¡Síguenos en Redes Sociales!'}
                    </h2>
                    <p className="text-lg md:text-xl text-white drop-shadow-xl font-medium">
                        {t('socialMedia.subtitle') || 'Para tours exclusivos y destinos inolvidables'}
                    </p>
                </div>

                {/* Social Media Cards */}
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-3xl mx-auto">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                transitionDelay: `${(index + 1) * 150}ms`,
                            }}
                        >
                            <div className="relative h-full">
                                {/* Card Background with Glassmorphism */}
                                <div
                                    className={`${social.bgGradient} ${social.hoverBg} backdrop-blur-md border-2 border-white/30 rounded-3xl p-8 md:p-10 h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(0,0,0,0.6)] group-hover:border-white/50`}
                                >
                                    {/* Icon Container */}
                                    <div className="relative mb-6 flex justify-center">
                                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 border-3 border-white/50 shadow-2xl group-hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                                            <social.icon className={`w-12 h-12 md:w-14 md:h-14 ${social.iconColor} drop-shadow-2xl`} />
                                        </div>
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 w-24 h-24 md:w-28 md:h-28 rounded-full ${social.glowColor} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight">
                                            {social.name}
                                        </h3>
                                        <p className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow-xl font-medium">
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
